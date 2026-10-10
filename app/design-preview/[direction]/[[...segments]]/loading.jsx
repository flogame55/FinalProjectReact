export default function DesignPreviewLoading() {
  return (
    <div className="design-preview-shell preview-calm" role="status" aria-live="polite">
      <div className="preview-nav"><span className="preview-brand">pause<span>.</span></span><span className="preview-eyebrow">OPENING DESIGN STUDY</span></div>
      <div className="preview-content preview-loading"><span className="preview-eyebrow">A MOMENT PLEASE</span><div className="preview-loading-line" /><p>กำลังเตรียมสินค้าและหน้าตัวอย่าง…</p></div>
    </div>
  )
}
