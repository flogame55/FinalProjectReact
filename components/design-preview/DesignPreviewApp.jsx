'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DesignPreviewProvider, useDesignPreview } from '@/context/DesignPreviewContext'
import Countdown from '@/components/Countdown'
import CheckoutForm from '@/components/CheckoutForm'
import HistoryChart from '@/components/HistoryChart'
import { formatPrice, getCategoryLabel } from '@/lib/presentation'

const concepts = {
  digital: { name: 'FUTURE / DIGITAL', title: 'จังหวะใหม่ของการเลือก', mark: 'PAUSE / 01', accent: 'CYAN SIGNAL' },
  luxury: { name: 'LUXURY EDITORIAL', title: 'เลือกในจังหวะที่ใช่', mark: 'THE PAUSE EDITION', accent: 'CONSIDERED OBJECTS' },
  calm: { name: 'CALM MINIMAL', title: 'ให้เวลากับสิ่งที่ชอบ', mark: 'A QUIETER WAY', accent: 'SPACE TO THINK' },
}

export default function DesignPreviewApp({ direction, page, basePath, data }) {
  const concept = concepts[direction]
  return (
    <DesignPreviewProvider direction={direction}>
    <div className={`design-preview-shell preview-${direction}`}>
      <PreviewNav direction={direction} basePath={basePath} />
      <div className="preview-content">
        {page === 'home' ? <HomePage direction={direction} basePath={basePath} products={data.products || []} /> : null}
        {page === 'products' && data.product ? <ProductDetail direction={direction} basePath={basePath} {...data} /> : null}
        {page === 'products' && !data.product ? <CatalogPage direction={direction} basePath={basePath} {...data} /> : null}
        {page === 'cart' ? <CartPage direction={direction} basePath={basePath} /> : null}
        {page === 'ready' ? <ReadyPage direction={direction} basePath={basePath} /> : null}
        {page === 'history' ? <HistoryPage direction={direction} basePath={basePath} {...data} /> : null}
      </div>
      <footer className="preview-footer"><Link href={basePath} className="preview-brand">pause<span>.</span></Link><p>ให้เวลาตัวเอง ก่อนเลือกสิ่งที่ใช่</p><span>{concept.name} · DESIGN PREVIEW</span></footer>
    </div>
    </DesignPreviewProvider>
  )
}

function PreviewNav({ direction, basePath }) {
  const { items = [], readyItems = [] } = useDesignPreview()
  const links = [
    ['สินค้า', `${basePath}/products`],
    ['ตะกร้าพัก', `${basePath}/cart`, items.length],
    ['พร้อมตัดสินใจ', `${basePath}/ready`, readyItems.length],
    ['ประวัติ', `${basePath}/history`],
  ]
  return (
    <header className="preview-nav">
      <Link href={basePath} className="preview-brand" aria-label="Pause preview หน้าแรก">pause<span>.</span><small>{direction === 'digital' ? 'LAB' : direction === 'luxury' ? 'ÉDITION' : 'SPACE'}</small></Link>
      <nav aria-label="เมนูตัวอย่างดีไซน์" className="preview-nav-links">
        {links.map(([label, href, count]) => <Link key={href} href={href}>{label}{count > 0 ? <span className="preview-nav-count">{count}</span> : null}</Link>)}
      </nav>
      <Link href="/design-preview" className="preview-exit">เปลี่ยนแนวทาง <span aria-hidden="true">↗</span></Link>
    </header>
  )
}

function HomePage({ direction, basePath, products }) {
  const featured = products.slice(0, 4)
  const hero = featured[0]
  if (!hero) return <PreviewEmpty title="ยังไม่มีสินค้าให้แสดง" href={`${basePath}/products`} />

  return (
    <div className={`preview-home preview-home-${direction}`}>
      {direction === 'digital' ? (
        <>
          <section className="digital-hero">
            <div className="digital-hero-copy"><p className="preview-eyebrow">{concepts.digital.mark} · {concepts.digital.accent}</p><h1>อยากได้<br /><em>พักก่อน</em></h1><p>ความรู้สึกไม่จำเป็นต้องกลายเป็นคำสั่งซื้อทันที เว้นจังหวะให้ตัวเอง แล้วกลับมาเลือกด้วยความมั่นใจ</p><div className="preview-hero-actions"><Link className="preview-primary" href={`${basePath}/products`}>สำรวจสินค้า <span>↗</span></Link><Link className="preview-text-link" href={`${basePath}/cart`}>เปิดพื้นที่พักคิด</Link></div><div className="digital-signal"><span className="signal-dot" /> YOUR NEXT DECISION CAN WAIT <span>01—03</span></div></div>
            <Link href={`${basePath}/products/${hero.id}`} className="digital-hero-object"><span className="digital-orbit digital-orbit-one" /><span className="digital-orbit digital-orbit-two" /><div className="digital-object-image"><Image src={hero.imageUrl} alt={hero.name} fill priority unoptimized sizes="(max-width: 768px) 90vw, 50vw" className="object-contain p-7" /></div><div className="digital-object-label"><span>FEATURED OBJECT / {String(hero.id).padStart(3, '0')}</span><b>{formatPrice(hero.price)}</b></div></Link>
          </section>
          <section className="preview-section digital-collection"><div className="preview-section-head"><div><p className="preview-eyebrow">SCAN / CONSIDER / DECIDE</p><h2>เริ่มจากสิ่งที่สะดุดตา</h2></div><Link href={`${basePath}/products`}>ดูแคตตาล็อกทั้งหมด ↗</Link></div><ProductGrid direction={direction} basePath={basePath} products={featured} /></section>
          <Steps direction={direction} />
        </>
      ) : null}

      {direction === 'luxury' ? (
        <>
          <section className="luxury-hero"><div className="luxury-hero-copy"><p className="preview-eyebrow">A STUDY IN INTENTION · NO. 01</p><h1>สิ่งที่ชอบ<br /><i>ไม่ต้องรีบเป็นเจ้าของ</i></h1><p>พื้นที่ที่ให้ความต้องการได้พัก ก่อนกลายเป็นการตัดสินใจ—ในจังหวะที่เป็นของคุณ</p><Link className="preview-primary" href={`${basePath}/products`}>ค้นพบคอลเลกชัน <span>↗</span></Link><span className="luxury-vertical-note">OBJECTS WORTH A SECOND THOUGHT</span></div><Link href={`${basePath}/products/${hero.id}`} className="luxury-hero-image"><span className="luxury-image-frame"><Image src={hero.imageUrl} alt={hero.name} fill priority unoptimized sizes="(max-width: 768px) 90vw, 48vw" className="object-contain p-8" /></span><span className="luxury-product-caption"><small>THE OBJECT Nº {String(hero.id).padStart(2, '0')}</small><b>{hero.name}</b><span>{formatPrice(hero.price)}</span></span></Link></section>
          <section className="preview-section luxury-collection"><div className="preview-section-head"><div><p className="preview-eyebrow">THE CONSIDERED SELECTION</p><h2>ชิ้นที่ควรรู้จักให้มากขึ้น</h2></div><Link href={`${basePath}/products`}>ดูทุกชิ้น <span>↗</span></Link></div><ProductGrid direction={direction} basePath={basePath} products={featured} /></section>
          <Steps direction={direction} />
        </>
      ) : null}

      {direction === 'calm' ? (
        <>
          <section className="calm-hero"><div className="calm-hero-copy"><p className="preview-eyebrow">A LITTLE SPACE FOR YOU</p><h1>ชอบได้<br /><span>ค่อยตัดสินใจ</span></h1><p>เก็บสิ่งที่สนใจไว้ก่อน แล้วให้เวลาช่วยตอบว่าสิ่งนั้นยังเหมาะกับคุณไหม</p><Link className="preview-primary" href={`${basePath}/products`}>เลือกดูสินค้า <span>→</span></Link><div className="calm-reassurance"><span>01</span><p>ยังไม่ต้องซื้อ<br /><b>แค่เริ่มจากการเลือก</b></p></div></div><Link href={`${basePath}/products/${hero.id}`} className="calm-hero-image"><div className="calm-image-disc"><Image src={hero.imageUrl} alt={hero.name} fill priority unoptimized sizes="(max-width: 768px) 85vw, 42vw" className="object-contain p-8" /></div><span>{getCategoryLabel(hero.category)} <b>·</b> {formatPrice(hero.price)}</span></Link></section>
          <section className="preview-section calm-collection"><div className="preview-section-head"><div><p className="preview-eyebrow">ค่อย ๆ เลือกในแบบของคุณ</p><h2>มีอะไรที่คุณกำลังมองหา?</h2></div><Link href={`${basePath}/products`}>ดูสินค้าทั้งหมด <span>→</span></Link></div><ProductGrid direction={direction} basePath={basePath} products={featured} /></section>
          <Steps direction={direction} />
        </>
      ) : null}
    </div>
  )
}

function ProductGrid({ direction, basePath, products }) {
  return <div className={`preview-product-grid preview-grid-${direction}`}>{products.map((product, index) => <ProductTile key={product.id} product={product} direction={direction} basePath={basePath} index={index} />)}</div>
}

function ProductTile({ product, direction, basePath, index = 0 }) {
  return (
    <Link href={`${basePath}/products/${product.id}`} className={`preview-product-tile tile-${direction}`} style={{ '--tile-index': index }}>
      <div className="preview-tile-image"><Image src={product.imageUrl} alt={product.name} fill unoptimized sizes="(max-width: 720px) 50vw, 25vw" className="object-contain p-5" /><span>{String(index + 1).padStart(2, '0')}</span><i aria-hidden="true">↗</i></div>
      <div className="preview-tile-info"><small>{getCategoryLabel(product.category)}</small><b>{product.name}</b><span>{formatPrice(product.price)}</span></div>
    </Link>
  )
}

function Steps({ direction }) {
  const steps = direction === 'digital'
    ? [['01 / DISCOVER', 'เลือกสิ่งที่สนใจ'], ['02 / PAUSE', 'ตั้งเวลาพักคิด'], ['03 / DECIDE', 'กลับมาเลือกอีกครั้ง']]
    : direction === 'luxury'
      ? [['I', 'พบสิ่งที่ชอบ'], ['II', 'ให้เวลาความคิด'], ['III', 'เลือกอย่างมั่นใจ']]
      : [['01', 'เลือกสิ่งที่ชอบ'], ['02', 'พักไว้ก่อน'], ['03', 'กลับมาเมื่อพร้อม']]
  return <section className={`preview-steps steps-${direction}`}><p className="preview-eyebrow">{direction === 'digital' ? 'A SIMPLE DECISION PROTOCOL' : direction === 'luxury' ? 'THE RITUAL OF PAUSING' : 'สามขั้นตอนสบาย ๆ'}</p><div>{steps.map(([number, label]) => <article key={number}><span>{number}</span><h3>{label}</h3></article>)}</div></section>
}

function CatalogPage({ direction, basePath, products = [], total = 0, categories = [], query = {} }) {
  const totalPages = Math.max(1, Math.ceil(total / 18))
  const params = new URLSearchParams()
  if (query.q) params.set('q', query.q)
  if (query.category) params.set('category', query.category)
  if (query.sort) params.set('sort', query.sort)
  return (
    <section className={`preview-catalog catalog-${direction}`}>
      <header className="preview-page-heading"><p className="preview-eyebrow">{concepts[direction].accent}</p><h1>{direction === 'digital' ? 'เลือกด้วยจังหวะของคุณ' : direction === 'luxury' ? 'The considered collection' : 'เลือกดูอย่างสบายใจ'}</h1><p>สำรวจสิ่งที่คุณสนใจ โดยไม่ต้องรีบตัดสินใจ</p></header>
      <form action={`${basePath}/products`} method="get" className="preview-filters"><label><span>ค้นหาสินค้า</span><input type="search" name="q" defaultValue={query.q} placeholder="พิมพ์ชื่อสินค้าที่สนใจ" /></label><label><span>หมวดหมู่</span><select name="category" defaultValue={query.category}><option value="">ทุกหมวดหมู่</option>{categories.map((category) => <option key={category.slug} value={category.slug}>{getCategoryLabel(category.slug)}</option>)}</select></label><label><span>เรียงตาม</span><select name="sort" defaultValue={query.sort}><option value="">แนะนำ</option><option value="price-asc">ราคาต่ำไปสูง</option><option value="price-desc">ราคาสูงไปต่ำ</option><option value="name">ชื่อ A–Z</option></select></label><button type="submit" className="preview-primary">ค้นหา</button></form>
      <div className="preview-results-head"><span>{query.q || query.category ? 'ผลการค้นหา' : 'ทั้งหมด'} · {total} รายการ</span><span>{products.length ? `แสดง ${products.length} ชิ้น` : 'ไม่พบสินค้า'}</span></div>
      {products.length ? <ProductGrid direction={direction} basePath={basePath} products={products} /> : <PreviewEmpty title="ยังไม่พบสินค้าที่ตรงกับการค้นหา" href={`${basePath}/products`} />}
      {totalPages > 1 ? <nav className="preview-pagination" aria-label="หน้ารายการสินค้า">{Array.from({ length: Math.min(totalPages, 7) }, (_, index) => index + 1).map((page) => { const next = new URLSearchParams(params); if (page > 1) next.set('page', String(page)); return <Link key={page} aria-current={(Number(query.page) || 1) === page ? 'page' : undefined} href={`${basePath}/products?${next}`}>{page}</Link> })}</nav> : null}
    </section>
  )
}

function ProductDetail({ direction, basePath, product, relatedProducts = [] }) {
  const details = [['แบรนด์', product.brand], ['หมวดหมู่', getCategoryLabel(product.category)], ['การจัดส่ง', product.shippingInformation], ['การรับประกัน', product.warrantyInformation], ['การคืนสินค้า', product.returnPolicy]].filter(([, value]) => value)
  return (
    <div className={`preview-detail detail-${direction}`}>
      <Link className="preview-back-link" href={`${basePath}/products`}>← กลับไปดูสินค้าทั้งหมด</Link>
      <section className="preview-detail-main"><div className="preview-detail-image"><Image src={product.imageUrl} alt={product.name} fill priority unoptimized sizes="(max-width: 850px) 100vw, 55vw" className="object-contain p-8 sm:p-14" /><span>{direction === 'luxury' ? 'OBJECT Nº ' : 'ITEM / '}{String(product.id).padStart(3, '0')}</span></div><div className="preview-detail-copy"><p className="preview-eyebrow">{product.brand || getCategoryLabel(product.category)}</p><h1>{product.name}</h1><div className="preview-detail-meta"><span>{getCategoryLabel(product.category)}</span>{product.rating ? <span>★ {product.rating.toFixed(1)}</span> : null}</div><p className="preview-detail-price">{formatPrice(product.price)}</p><p className="preview-detail-description">{product.description || 'ใช้เวลาทำความรู้จักสิ่งที่คุณสนใจ ก่อนเลือกว่าจะพากลับบ้านหรือปล่อยผ่าน'}</p><div className="preview-pause-note"><span aria-hidden="true">Ⅱ</span><p><b>ชอบได้ ยังไม่ต้องรีบซื้อ</b><br />พักชิ้นนี้ไว้ก่อน แล้วกลับมาเมื่อคุณพร้อม</p></div><PreviewPauseAction product={product} basePath={basePath} /></div></section>
      {relatedProducts.length ? <section className="preview-related"><div className="preview-section-head"><div><p className="preview-eyebrow">MORE TO CONSIDER</p><h2>ชิ้นอื่นในหมวดเดียวกัน</h2></div></div><ProductGrid direction={direction} basePath={basePath} products={relatedProducts} /></section> : null}
      <section className="preview-detail-facts"><p className="preview-eyebrow">รายละเอียดสินค้า</p><dl>{details.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></section>
    </div>
  )
}

function PreviewPauseAction({ product, basePath }) {
  const router = useRouter()
  const { addItem, skipItem, has, hydrated } = useDesignPreview()
  const [hours, setHours] = useState('24')
  if (has(product.id)) return <div className="preview-pause-action"><p>สินค้านี้อยู่ในตะกร้าพักแล้ว</p><Link className="preview-primary" href={`${basePath}/cart`}>ไปที่ตะกร้าพัก →</Link></div>
  function pause() { if (!hydrated) return; addItem(product.id, Number(hours), product); router.push(`${basePath}/cart`) }
  function decideNow() { skipItem(product.id, product); router.push(`${basePath}/ready`) }
  return <div className="preview-pause-action"><label htmlFor="preview-pause-hours">ให้เวลาตัวเองพักคิด</label><div className="preview-pause-controls"><select id="preview-pause-hours" value={hours} onChange={(event) => setHours(event.target.value)}><option value="1">1 ชั่วโมง</option><option value="6">6 ชั่วโมง</option><option value="24">24 ชั่วโมง</option><option value="48">2 วัน</option><option value="168">7 วัน</option></select><button type="button" onClick={pause} disabled={!hydrated} className="preview-primary">พักคิดก่อน <span>↗</span></button></div><button type="button" onClick={decideNow} disabled={!hydrated} className="preview-text-link">ข้ามเวลาพัก แล้วไปตัดสินใจ →</button></div>
}

function CartPage({ direction, basePath }) {
  const { items, readyItems, removeItem, skipItem, hydrated, now, devFastForward, setDevFastForward } = useDesignPreview()
  const total = items.reduce((sum, item) => sum + Number(item.product?.price || 0), 0)
  return <section className={`preview-cart cart-${direction}`}><header className="preview-page-heading"><p className="preview-eyebrow">{concepts[direction].mark} / YOUR SPACE</p><h1>ตะกร้าพัก</h1><p>สิ่งที่คุณสนใจยังอยู่ตรงนี้ ให้เวลาตัวเองก่อนตัดสินใจ</p></header><div className="preview-cart-tools"><button type="button" onClick={() => setDevFastForward((value) => !value)} aria-pressed={devFastForward}>{devFastForward ? '⚡ กำลังเร่งเวลา' : '⚡ โหมดสาธิตเวลา'}</button><Link className="preview-text-link" href={`${basePath}/products`}>เลือกดูสินค้าต่อ ↗</Link></div>
    {!hydrated ? <PreviewEmpty title="กำลังเปิดตะกร้าพักของคุณ…" /> : items.length === 0 ? <PreviewEmpty title="ยังไม่มีสิ่งที่พักไว้" text="เลือกสินค้าที่สนใจ แล้วให้เวลาช่วยคุณตัดสินใจ" href={`${basePath}/products`} action="ค้นหาสินค้า" /> : <div className="preview-cart-layout"><div className="preview-cart-list">{items.map((item) => { const product = item.product; const isReady = item.skipped || item.readyAt <= now; return <article className="preview-cart-item" key={item.productId}><div className="preview-cart-item-main"><Link href={`${basePath}/products/${item.productId}`} className="preview-cart-image" aria-label={`ดู ${product?.name || 'สินค้า'}`}>{product?.imageUrl ? <Image src={product.imageUrl} alt={product.name} fill unoptimized sizes="120px" className="object-contain p-3" /> : null}</Link><div className="preview-cart-copy"><p className="preview-eyebrow">{getCategoryLabel(product?.category)}</p><h2><Link href={`${basePath}/products/${item.productId}`}>{product?.name || `สินค้า #${item.productId}`}</Link></h2><b>{formatPrice(product?.price || 0)}</b><small>เริ่มพัก {new Date(item.addedAt).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })}</small></div><button className="preview-remove" type="button" onClick={() => removeItem(item.productId)} aria-label={`นำ ${product?.name || 'สินค้า'} ออกจากตะกร้าพัก`}>×</button></div><div className="preview-cart-timer">{isReady ? <div className="preview-ready-note"><span>✓ {item.skipped ? 'พร้อมตัดสินใจแล้ว' : 'ครบเวลาพักคิดแล้ว'}</span><Link className="preview-primary" href={`${basePath}/ready`}>ไปตัดสินใจ →</Link></div> : <Countdown startedAt={item.addedAt} readyAt={item.readyAt} durationMs={item.durationMs} onSkip={() => skipItem(item.productId, product)} isFastForward={devFastForward} />}</div></article> })}</div><aside className="preview-cart-summary"><p className="preview-eyebrow">A MOMENT TO REFLECT</p><h2>ยังไม่ใช่คำสั่งซื้อ</h2><p>เวลาที่ผ่านไปช่วยให้เห็นว่าสิ่งนี้ยังเหมาะกับชีวิตและงบประมาณของคุณหรือไม่</p><dl><div><dt>สินค้าที่พัก</dt><dd>{items.length} รายการ</dd></div><div><dt>พร้อมตัดสินใจ</dt><dd>{readyItems.length} รายการ</dd></div><div><dt>มูลค่ารวม</dt><dd>{formatPrice(total)}</dd></div></dl><Link className="preview-primary" href={`${basePath}/ready`}>ไปหน้าตัดสินใจ →</Link></aside></div>}
  </section>
}

function ReadyPage({ direction, basePath }) {
  const { readyItems, removeItem, hydrated, recordDecision } = useDesignPreview()
  const [selected, setSelected] = useState(null)
  const [notice, setNotice] = useState('')
  const [result, setResult] = useState(null)
  const [busy, setBusy] = useState(false)
  async function pass(item) { if (busy) return; setNotice(''); setBusy(true); await Promise.resolve(); const response = { ok: true }; setBusy(false); if (!response.ok) { setNotice('บันทึกไม่สำเร็จ กรุณาลองอีกครั้ง'); return }; recordDecision({ productId: item.productId, productName: item.product?.name || `สินค้า #${item.productId}`, price: item.product?.price || 0, decisionStatus: 'PASSED', skipped: item.skipped }); removeItem(item.productId); setResult({ type: 'PASSED', name: item.product?.name, price: item.product?.price || 0 }) }
  async function confirm() { if (!selected) return { ok: false }; const item = selected; recordDecision({ productId: item.productId, productName: item.product?.name || `สินค้า #${item.productId}`, price: item.product?.price || 0, decisionStatus: 'BOUGHT', skipped: item.skipped }); removeItem(item.productId); setSelected(null); setResult({ type: 'BOUGHT', name: item.product?.name, price: item.product?.price || 0 }); return { ok: true } }
  return <section className={`preview-ready ready-${direction}`}><header className="preview-page-heading"><p className="preview-eyebrow">{selected ? 'FINAL REVIEW' : 'A DECISION, ON YOUR TERMS'}</p><h1>{selected ? 'ทบทวนก่อนยืนยัน' : 'พร้อมแล้ว ค่อยตัดสินใจ'}</h1><p>ได้ให้เวลากับตัวเองแล้ว ตอนนี้คุณยังต้องการสิ่งนี้อยู่ไหม?</p></header>{notice ? <p role="alert" className="preview-alert">{notice}</p> : null}
    {!hydrated ? <PreviewEmpty title="กำลังเปิดรายการของคุณ…" /> : selected ? <div className="preview-checkout"><CheckoutForm item={selected} checkoutAvailable onConfirm={confirm} onCancel={() => setSelected(null)} /></div> : readyItems.length === 0 ? <PreviewEmpty title="ยังไม่มีรายการที่พร้อมตัดสินใจ" text="เมื่อครบเวลาพัก สินค้าของคุณจะแสดงที่นี่" href={`${basePath}/cart`} action="กลับไปตะกร้าพัก" /> : <div className="preview-ready-layout"><div className="preview-ready-list">{readyItems.map((item) => <article className="preview-ready-item" key={item.productId}><div className="preview-cart-item-main"><Link href={`${basePath}/products/${item.productId}`} className="preview-cart-image" aria-label={`ดู ${item.product?.name || 'สินค้า'}`}>{item.product?.imageUrl ? <Image src={item.product.imageUrl} alt={item.product.name} fill unoptimized sizes="120px" className="object-contain p-3" /> : null}</Link><div className="preview-cart-copy"><span className="preview-ready-status">✓ {item.skipped ? 'ข้ามเวลาพักแล้ว' : 'ครบเวลาพักคิดแล้ว'}</span><h2>{item.product?.name || `สินค้า #${item.productId}`}</h2><b>{formatPrice(item.product?.price || 0)}</b></div></div><div className="preview-decision-actions"><button type="button" disabled={busy} className="preview-primary" onClick={() => setSelected(item)}>ยังต้องการ · ทบทวนการสั่งซื้อ</button><button type="button" disabled={busy} className="preview-pass" onClick={() => pass(item)}>{busy ? 'กำลังบันทึก…' : 'เปลี่ยนใจ · เก็บเงินไว้'}</button></div></article>)}</div><aside className="preview-cart-summary"><p className="preview-eyebrow">A SMALL CHECK-IN</p><h2>ถามตัวเองอีกสักครั้ง</h2><ol><li>ฉันจะได้ใช้สิ่งนี้จริงไหม?</li><li>มีของที่ใช้แทนกันได้หรือเปล่า?</li><li>ราคานี้อยู่ในงบที่ตั้งใจไว้ไหม?</li></ol><Link className="preview-text-link" href={`${basePath}/cart`}>กลับไปตะกร้าพัก ↗</Link></aside></div>}
    {result ? <div className="preview-result" role="status"><p className="preview-eyebrow">{result.type === 'PASSED' ? 'A THOUGHTFUL CHOICE' : 'DECISION RECORDED'}</p><h2>{result.type === 'PASSED' ? `คุณเก็บเงินไว้ ${formatPrice(result.price)}` : 'บันทึกการตัดสินใจแล้ว'}</h2><p>{result.type === 'PASSED' ? `เปลี่ยนใจจาก ${result.name || 'สินค้า'} ได้อย่างมั่นใจ` : `บันทึกการเลือกซื้อ ${result.name || 'สินค้า'} แล้ว`}</p><Link className="preview-primary" href={`${basePath}/history`}>ดูประวัติการตัดสินใจ →</Link></div> : null}
  </section>
}

function HistoryPage({ direction, basePath }) {
  const { decisions: logs = [] } = useDesignPreview()
  const loadFailed = false
  const bought = logs.filter((log) => log.decisionStatus === 'BOUGHT')
  const passed = logs.filter((log) => log.decisionStatus === 'PASSED')
  const valueOf = (log) => Number.isFinite(Number(log.price)) ? Number(log.price) : 0
  const saved = passed.reduce((sum, log) => sum + valueOf(log), 0)
  const spent = bought.reduce((sum, log) => sum + valueOf(log), 0)
  const decisions = bought.length + passed.length
  const chart = [{ name: 'ซื้อจริง', count: bought.length, color: '#10B981' }, { name: 'เปลี่ยนใจ', count: passed.length, color: '#6366F1' }, { name: 'ข้ามเวลา', count: logs.filter((log) => log.skipped).length, color: '#EF4444' }]
  return <section className={`preview-history history-${direction}`}><header className="preview-page-heading"><p className="preview-eyebrow">YOUR PAUSE / YOUR PERSPECTIVE</p><h1>ทุกการตัดสินใจ<br />มีความหมาย</h1><p>ภาพรวมของสิ่งที่คุณเลือกซื้อและสิ่งที่คุณเลือกปล่อยผ่าน</p></header>{loadFailed ? <p role="alert" className="preview-alert">โหลดประวัติไม่สำเร็จ กรุณาลองใหม่ภายหลัง</p> : null}<div className="preview-metrics"><Metric label="เงินที่ยังอยู่กับคุณ" value={formatPrice(saved)} note="มูลค่าของรายการที่คุณเปลี่ยนใจ" /><Metric label="ยอดที่เลือกซื้อ" value={formatPrice(spent)} note="มูลค่าของรายการที่ตัดสินใจซื้อ" /><Metric label="การตัดสินใจทั้งหมด" value={decisions.toLocaleString('th-TH')} note="รายการที่บันทึกไว้" /></div>{!decisions && !loadFailed ? <PreviewEmpty title="เรื่องราวการเลือกของคุณเริ่มได้จากการพัก" text="เมื่อคุณตัดสินใจหลังพักสินค้า ภาพรวมจะปรากฏที่นี่" href={`${basePath}/products`} action="เลือกดูสินค้า" /> : <><section className="preview-history-chart"><div className="preview-section-head"><div><p className="preview-eyebrow">A CLEARER PICTURE</p><h2>ภาพรวมการตัดสินใจ</h2></div><span>{decisions} รายการ</span></div><HistoryChart data={chart} /></section><section className="preview-history-table"><h2>การตัดสินใจล่าสุด</h2><div className="preview-table-scroll"><table><thead><tr><th>วันที่</th><th>การตัดสินใจ</th><th>มูลค่า</th><th>ช่วงพัก</th></tr></thead><tbody>{logs.slice(0, 8).map((log, index) => <tr key={`${log.timestamp}-${index}`}><td>{new Date(log.timestamp).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })}</td><td>{log.decisionStatus === 'PASSED' ? 'เปลี่ยนใจ' : 'เลือกซื้อ'}</td><td>{formatPrice(valueOf(log))}</td><td>{log.skipped ? 'ข้ามเวลาพัก' : 'พักครบเวลา'}</td></tr>)}</tbody></table></div></section></>}</section>
}

function Metric({ label, value, note }) { return <article className="preview-metric"><p>{label}</p><b>{value}</b><span>{note}</span></article> }

function PreviewEmpty({ title, text, href, action }) { return <div className="preview-empty"><span aria-hidden="true">○</span><h2>{title}</h2>{text ? <p>{text}</p> : null}{href ? <Link className="preview-primary" href={href}>{action || 'เริ่มต้น'} →</Link> : null}</div> }
