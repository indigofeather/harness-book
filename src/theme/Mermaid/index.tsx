import React, {useEffect, useRef, useState, type ReactNode} from 'react';
import {createPortal} from 'react-dom';
import ErrorBoundary from '@docusaurus/ErrorBoundary';
import {ErrorBoundaryErrorMessageFallback} from '@docusaurus/theme-common';
import {
  MermaidContainerClassName,
  useMermaidRenderResult,
} from '@docusaurus/theme-mermaid/client';
import type {Props} from '@theme/Mermaid';
import type {RenderResult} from 'mermaid';

import styles from './styles.module.css';

const MIN_ZOOM = 0.75;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.25;

function Diagram({
  renderResult,
  modal = false,
  zoom = 1,
}: {
  renderResult: RenderResult;
  modal?: boolean;
  zoom?: number;
}): ReactNode {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const div = ref.current;
    if (!div) {
      return;
    }

    renderResult.bindFunctions?.(div);

    const svg = div.querySelector('svg');
    if (!svg) {
      return;
    }

    if (modal) {
      svg.style.width = `${zoom * 100}%`;
      svg.style.maxWidth = 'none';
      svg.style.height = 'auto';
      svg.style.margin = '0';
    }
  }, [renderResult, modal, zoom]);

  return (
    <div
      ref={ref}
      className={`${MermaidContainerClassName} ${styles.container} ${modal ? styles.modalDiagram : ''}`}
      // Mermaid returns trusted SVG generated from the Markdown source.
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{__html: renderResult.svg}}
    />
  );
}

function MermaidRenderResult({renderResult}: {renderResult: RenderResult}): ReactNode {
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(1);

  const closeModal = () => {
    setOpen(false);
    setZoom(1);
  };

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const zoomOut = () => setZoom((value) => Math.max(MIN_ZOOM, value - ZOOM_STEP));
  const zoomIn = () => setZoom((value) => Math.min(MAX_ZOOM, value + ZOOM_STEP));

  const modal =
    open && typeof document !== 'undefined'
      ? createPortal(
          <div
            className={styles.backdrop}
            role="dialog"
            aria-modal="true"
            aria-label="Mermaid 圖表放大檢視"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closeModal();
              }
            }}>
            <div className={styles.modalPanel}>
              <div className={styles.toolbar}>
                <div>
                  <strong>圖表放大檢視</strong>
                  <span className={styles.toolbarHint}>直接放大 SVG，可水平與垂直捲動</span>
                </div>
                <div className={styles.toolbarActions}>
                  <button
                    type="button"
                    className={styles.toolbarButton}
                    onClick={zoomOut}
                    disabled={zoom <= MIN_ZOOM}
                    aria-label="縮小圖表">
                    −
                  </button>
                  <span className={styles.zoomValue} aria-live="polite">
                    {Math.round(zoom * 100)}%
                  </span>
                  <button
                    type="button"
                    className={styles.toolbarButton}
                    onClick={zoomIn}
                    disabled={zoom >= MAX_ZOOM}
                    aria-label="放大圖表">
                    ＋
                  </button>
                  <button
                    type="button"
                    className={styles.resetButton}
                    onClick={() => setZoom(1)}>
                    100%
                  </button>
                  <button
                    type="button"
                    className={styles.closeButton}
                    onClick={closeModal}
                    aria-label="關閉圖表檢視">
                    關閉
                  </button>
                </div>
              </div>

              <div className={styles.viewport}>
                <Diagram renderResult={renderResult} modal zoom={zoom} />
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <figure className={styles.frame}>
        <div
          className={styles.preview}
          onClick={(event) => {
            const target = event.target as HTMLElement;
            if (!target.closest('a')) {
              setOpen(true);
            }
          }}>
          <Diagram renderResult={renderResult} />
        </div>
        <button
          type="button"
          className={styles.openButton}
          onClick={() => setOpen(true)}
          aria-label="放大檢視這張 Mermaid 圖表">
          <span aria-hidden="true">↗</span>
          放大
        </button>
      </figure>
      {modal}
    </>
  );
}

function MermaidRenderer({value}: Props): ReactNode {
  const renderResult = useMermaidRenderResult({text: value});
  if (renderResult === null) {
    return null;
  }
  return <MermaidRenderResult renderResult={renderResult} />;
}

export default function Mermaid(props: Props): ReactNode {
  return (
    <ErrorBoundary
      fallback={(params) => <ErrorBoundaryErrorMessageFallback {...params} />}>
      <MermaidRenderer {...props} />
    </ErrorBoundary>
  );
}
