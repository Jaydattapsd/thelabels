import { createFileRoute } from "@tanstack/react-router";
import {
  Barcode,
  Check,
  ChevronDown,
  CircleCheck,
  Headphones,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  PackageCheck,
  Phone,
  Printer,
  ScanBarcode,
  ShieldCheck,
  Sparkles,
  Tags,
  Wrench,
  X,
} from "lucide-react";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";

import barcodeLabelsAsset from "../assets/barcode-labels.jpg.asset.json";
import barcodePrinterAsset from "../assets/barcode-printer.jpg.asset.json";
import barcodeScannerAsset from "../assets/barcode-scanner.jpg.asset.json";
import garmentTagsAsset from "../assets/garment-tags.jpg.asset.json";
import heroProductsAsset from "../assets/hero-products.jpg.asset.json";
import ribbonRollsAsset from "../assets/ribbon-rolls.jpg.asset.json";
import thermalRollsAsset from "../assets/thermal-rolls.jpg.asset.json";
import officialLogoAsset from "../assets/the-labels-logo.png.asset.json";

const SITE_URL = "https://thelabels.in";
const PHONE_DISPLAY = "+91 97256 62466";
const PHONE_LINK = "+919725662466";
const EMAIL = "info@thelabels.in";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello The Labels, I would like to discuss my barcode/label requirement and get a quotation.",
);
const WHATSAPP_URL = `https://wa.me/${PHONE_LINK.replace("+", "")}?text=${WHATSAPP_MESSAGE}`;

const PAGE_TITLE = "The Labels | Barcode Labels, Stickers, Printers & Scanners in Pune";
const PAGE_DESCRIPTION =
  "The Labels provides barcode labels, barcode stickers, thermal paper rolls, jewellery tags, sticker printers and barcode scanners in Pune. Get a quote or contact our support team.";

const navItems = [
  ["Home", "#home"],
  ["Products", "#products"],
  ["Services", "#services"],
  ["Pune", "#pune"],
  ["About", "#about"],
  ["FAQ", "#faq"],
  ["Contact", "#contact"],
] as const;

const productOptions = [
  "Barcode Stickers",
  "Printed Barcode Labels",
  "Plain Barcode Stickers",
  "Manufacturing Barcode Labels",
  "Custom Barcode Labels",
  "Jewellery Tags",
  "Clothes / Garment Tags",
  "Thermal Paper Rolls",
  "Ribbon Rolls",
  "Sticker Printer",
  "Barcode Printer",
  "Barcode Scanner",
  "Other",
] as const;

const products = [
  {
    title: "Barcode Labels & Stickers",
    description:
      "Plain and printed barcode stickers supplied in the sizes and materials your labelling process needs.",
    items: ["Plain Barcode Stickers", "Printed Barcode Stickers", "Manufacturing Barcode Labels", "Custom Barcode Labels"],
    uses: "Used for inventory tracking, product identification, warehouse racking and manufacturing labelling.",
    image: barcodeLabelsAsset.url,
    alt: "Rolls of plain and printed barcode sticker labels supplied by The Labels in Pune",
    value: "Barcode Stickers",
    span: "lg:col-span-6",
  },
  {
    title: "Jewellery & Garment Tags",
    description: "Tags for jewellery, apparel and retail products where clear identification and pricing matter.",
    items: ["Jewellery Tags", "Garment / Clothes Tags", "Product Identification Tags", "Custom Tags"],
    uses: "Used by jewellers, garment units, boutiques and retail counters.",
    image: garmentTagsAsset.url,
    alt: "Jewellery tags and garment clothes tags supplied by The Labels in Pune",
    value: "Jewellery Tags",
    span: "lg:col-span-3",
  },
  {
    title: "Thermal Paper Rolls",
    description: "Consistent paper consumables for billing counters and everyday business printing.",
    items: ["Thermal Paper Rolls", "Paper Rolls", "Sheets", "Billing Consumables"],
    uses: "Used at POS billing counters, retail shops, restaurants and service desks.",
    image: thermalRollsAsset.url,
    alt: "Thermal paper rolls for billing and POS printers supplied in Pune",
    value: "Thermal Paper Rolls",
    span: "lg:col-span-3",
  },
  {
    title: "Ribbon Rolls",
    description: "Printer ribbons matched to your label material so printed barcodes stay clear and durable.",
    items: ["Thermal Transfer Ribbon Rolls", "Ribbons for Barcode Printers"],
    uses: "Used with thermal transfer barcode printers for long-lasting label printing.",
    image: ribbonRollsAsset.url,
    alt: "Thermal transfer ribbon rolls for barcode label printers",
    value: "Ribbon Rolls",
    span: "lg:col-span-4",
  },
  {
    title: "Sticker & Barcode Printers",
    description: "Sticker and barcode label printers selected around your label type, volume and workflow.",
    items: ["Sticker Printers", "Barcode Label Printers", "Printer Consumables & Support"],
    uses: "Used in warehouses, manufacturing units, retail stores and packing lines.",
    image: barcodePrinterAsset.url,
    alt: "Desktop barcode sticker printer printing a barcode label",
    value: "Barcode Printer",
    span: "lg:col-span-4",
    serviceLink: "#services",
    serviceLabel: "Printer Sales & Service",
  },
  {
    title: "Barcode Scanners",
    description: "Handheld barcode scanners for fast, accurate scanning at billing, stores and dispatch points.",
    items: ["Handheld Barcode Scanners", "Barcode Scanning Solutions"],
    uses: "Used for billing, stock counting, dispatch verification and store operations.",
    image: barcodeScannerAsset.url,
    alt: "Professional handheld barcode scanner supplied and serviced in Pune",
    value: "Barcode Scanner",
    span: "lg:col-span-4",
    serviceLink: "#services",
    serviceLabel: "Scanner Sales & Service",
  },
];

const faqs = [
  {
    q: "What types of barcode labels do you provide?",
    a: "We provide plain barcode stickers, printed barcode stickers, manufacturing barcode labels and custom barcode labels in the sizes and materials your process requires.",
  },
  {
    q: "Do you provide plain and printed barcode stickers?",
    a: "Yes. Both plain (blank) barcode stickers and pre-printed barcode stickers are supplied based on your requirement.",
  },
  {
    q: "Do you provide barcode printers?",
    a: "Yes. We supply sticker printers and barcode label printers, and help you choose one suited to your label type and printing volume.",
  },
  {
    q: "Do you provide barcode scanner sales and service?",
    a: "Yes. We offer barcode scanner sales along with service support for the scanners used in your operations.",
  },
  {
    q: "Can I request a quotation?",
    a: "Yes. Use the Get a Quote form on this page, or call or WhatsApp us on +91 97256 62466 and share your requirement.",
  },
  {
    q: "Do you provide jewellery and garment tags?",
    a: "Yes. We supply jewellery tags, garment and clothes tags, and other product identification tags.",
  },
  {
    q: "Where is The Labels located?",
    a: "The Labels is based in Pune, Maharashtra, India. You can reach us on +91 97256 62466 or at info@thelabels.in.",
  },
];

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "The Labels",
  description: PAGE_DESCRIPTION,
  url: SITE_URL,
  telephone: PHONE_DISPLAY,
  email: EMAIL,
  logo: `${SITE_URL}${officialLogoAsset.url}`,
  image: `${SITE_URL}${heroProductsAsset.url}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  areaServed: { "@type": "City", name: "Pune" },
  slogan: "Stick. Identify. Organize.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESCRIPTION },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:site_name", content: "The Labels" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESCRIPTION },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
  }),
  component: Index,
});

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#home" className="flex min-w-0 items-center" aria-label="The Labels home">
      <img
        src={officialLogoAsset.url}
        alt="The Labels — Stick. Identify. Organize."
        width={520}
        height={140}
        className={`${compact ? "h-11 w-40" : "h-14 w-52"} object-contain object-left transition-[width,height] duration-200`}
      />
    </a>
  );
}

function ButtonLink({ href, children, secondary = false, className = "", external = false }: { href: string; children: ReactNode; secondary?: boolean; className?: string; external?: boolean }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={`${secondary ? "border border-primary/15 bg-card text-primary hover:border-accent/50 hover:bg-background" : "bg-accent text-accent-foreground shadow-sm hover:bg-primary"} inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-bold transition duration-200 hover:-translate-y-0.5 ${className}`}
    >
      {children}
    </a>
  );
}

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">{eyebrow}</p>
      <h2 className="mt-2 font-display text-3xl font-semibold leading-tight text-primary sm:text-4xl">{title}</h2>
      {copy && <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">{copy}</p>}
    </div>
  );
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const enquire = (value: string) => {
    setSelectedProduct(value);
    setSubmitted(false);
    window.setTimeout(() => document.querySelector("#quote")?.scrollIntoView({ behavior: "smooth" }), 20);
  };

  const submitQuote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!event.currentTarget.checkValidity()) return;
    setSubmitted(true);
    event.currentTarget.reset();
    setSelectedProduct("");
  };

  return (
    <div className="page-wash min-h-screen overflow-x-hidden selection:bg-sky/40">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <header className="sticky top-0 z-50 px-3 sm:px-6">
        <div className={`glass-panel mx-auto mt-2 max-w-7xl rounded-lg px-4 transition-all duration-200 sm:px-5 ${scrolled ? "py-2 shadow-lg" : "py-3"}`}>
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 lg:flex lg:justify-between">
            <BrandMark compact={scrolled} />
            <nav aria-label="Primary navigation" className="hidden items-center gap-6 lg:flex">
              {navItems.map(([label, href]) => (
                <a key={href} href={href} className="text-sm font-semibold text-primary/70 transition hover:text-accent">{label}</a>
              ))}
            </nav>
            <div className="flex shrink-0 items-center gap-2">
              <a href={`tel:${PHONE_LINK}`} className="hidden text-sm font-bold text-primary xl:block">{PHONE_DISPLAY}</a>
              <ButtonLink href="#quote" className="hidden sm:inline-flex">Get a Quote</ButtonLink>
              <button type="button" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-label="Toggle navigation menu" className="grid h-11 w-11 place-items-center rounded-md border border-primary/15 bg-card text-primary lg:hidden">
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
          {menuOpen && (
            <nav aria-label="Mobile navigation" className="mt-3 grid gap-1 border-t border-border pt-3 lg:hidden">
              {navItems.map(([label, href]) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-3 text-sm font-bold text-primary hover:bg-muted">{label}</a>
              ))}
              <a href="#quote" onClick={() => setMenuOpen(false)} className="mt-1 rounded-md bg-accent px-3 py-3 text-center text-sm font-bold text-accent-foreground sm:hidden">Get a Quote</a>
            </nav>
          )}
        </div>
      </header>

      <main>
        <section id="home" className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-14 sm:px-6 lg:grid-cols-12 lg:pt-20">
          <div className="lg:col-span-6">
            <div className="rise inline-flex items-center gap-2 rounded-full border border-accent/20 bg-card px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-sky" /> LABELING &amp; BARCODE SOLUTIONS
            </div>
            <div className="rise rise-delay-1 mt-6"><BrandMark /></div>
            <h1 className="rise rise-delay-2 mt-7 max-w-[18ch] font-display text-4xl font-semibold leading-[1.1] text-primary sm:text-5xl lg:text-[3.2rem]">
              Barcode Labels, Stickers, Printers &amp; Scanners 
            </h1>
            <p className="rise rise-delay-3 mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              The Labels provides barcode labels, printed stickers, thermal paper rolls, jewellery tags, sticker printers and barcode scanners for businesses in Pune and across India.
            </p>
            <div className="rise rise-delay-3 mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href="#quote">Get a Quote</ButtonLink>
              <ButtonLink href="#contact" secondary>Contact Support</ButtonLink>
            </div>
            <div className="rise rise-delay-3 mt-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href={`tel:${PHONE_LINK}`} secondary><Phone className="h-4 w-4" />Call {PHONE_DISPLAY}</ButtonLink>
              <ButtonLink href={WHATSAPP_URL} secondary external><MessageCircle className="h-4 w-4" />WhatsApp</ButtonLink>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="glass-panel relative overflow-hidden rounded-xl p-3 sm:p-4">
              <img src={heroProductsAsset.url} width={1408} height={912} alt="Barcode printer, barcode scanner, barcode label rolls and garment tags from The Labels" className="aspect-[14/9] w-full rounded-lg object-cover" fetchPriority="high" decoding="async" />
              <div className="absolute bottom-6 left-6 rounded-md bg-primary/90 px-4 py-3 text-primary-foreground backdrop-blur-md">
                <p className="font-display text-sm font-semibold">STICK. IDENTIFY. ORGANIZE.</p>
                <p className="mt-1 text-xs text-primary-foreground/75">Reliable Solutions for a Smarter Tomorrow</p>
              </div>
            </div>
          </div>
        </section>

        <section id="products" className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-20">
          <SectionHeading
            eyebrow="Our Products"
            title="Barcode labels, tags, consumables and hardware"
            copy="From barcode stickers and thermal paper to printers, ribbons and scanners — supplied around how your business actually works."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
            {products.map((product) => (
              <article key={product.title} className={`glass-panel group flex flex-col overflow-hidden rounded-xl p-4 transition duration-200 hover:-translate-y-1 ${product.span}`}>
                <div className="flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-lg bg-muted p-3 sm:p-4">
                  <img src={product.image} width={912} height={736} loading="lazy" decoding="async" alt={product.alt} className="h-full w-full object-contain object-center" />
                </div>
                <div className="flex flex-1 flex-col px-1 pb-1 pt-5">
                  <h3 className="font-display text-xl font-semibold text-primary">{product.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{product.description}</p>
                  <ul className="mt-4 grid gap-2 text-sm text-primary/75 sm:grid-cols-2">
                    {product.items.map((item) => <li key={item} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{item}</li>)}
                  </ul>
                  <p className="mt-4 flex-1 text-sm leading-6 text-muted-foreground"><span className="font-bold text-primary/80">Applications: </span>{product.uses}</p>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <button type="button" onClick={() => enquire(product.value)} className="inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground transition hover:bg-primary">Enquire Now</button>
                    {product.serviceLink && (
                      <a href={product.serviceLink} className="text-sm font-bold text-accent underline-offset-4 hover:underline">{product.serviceLabel}</a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="services" className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-20">
          <SectionHeading
            eyebrow="Our Services"
            title="Sales and service that keep your labelling running"
            copy="Support for the barcode equipment and consumables your operations depend on every day."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [ScanBarcode, "Barcode Scanner Sales & Service", "Help choosing the right handheld scanner, plus service support if a scanner in use stops reading reliably.", "Barcode Scanner"],
              [Printer, "Sticker Printer Sales & Service", "Sticker and barcode printer supply, setup guidance and service support for printing issues and consumables.", "Sticker Printer"],
              [Tags, "Barcode Sticker Sales", "Plain, printed, custom and manufacturing barcode stickers supplied in the sizes and materials you use.", "Barcode Stickers"],
              [Barcode, "Barcode & Label Solutions", "End-to-end guidance: matching labels, ribbons, printers and scanners into one workable labelling setup.", "Other"],
            ].map(([Icon, title, copy, value]) => {
              const ServiceIcon = Icon as typeof ScanBarcode;
              return (
                <article key={title as string} className="glass-panel diagonal-detail flex flex-col rounded-xl p-7">
                  <span className="grid h-12 w-12 place-items-center rounded-md bg-primary text-primary-foreground"><ServiceIcon className="h-6 w-6" /></span>
                  <h3 className="mt-6 font-display text-xl font-semibold leading-7 text-primary">{title as string}</h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{copy as string}</p>
                  <button type="button" onClick={() => enquire(value as string)} className="mt-6 min-h-11 rounded-md border border-primary/15 bg-card px-4 py-2.5 text-sm font-bold text-primary transition hover:border-accent/50 hover:text-accent">Discuss Your Requirement</button>
                </article>
              );
            })}
          </div>
        </section>

        <section id="pune" className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-20">
          <div className="glass-panel diagonal-detail grid gap-10 rounded-xl p-6 sm:p-10 lg:grid-cols-12 lg:p-12">
            <div className="lg:col-span-5">
              <SectionHeading eyebrow="Local Presence" title="Barcode & Label Solutions in Pune" />
            </div>
            <div className="space-y-5 text-base leading-7 text-muted-foreground lg:col-span-7">
              <p>
                Based in Pune, The Labels works with businesses that need dependable barcode and labelling supplies — retail counters, manufacturing units, warehouses, jewellers and garment businesses.
              </p>
              <p>
                Whether you need barcode stickers, thermal paper rolls, ribbon rolls, jewellery or garment tags, a sticker printer or a barcode scanner, we help match the product to the job and stay available for follow-up support.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {["Barcode labels", "Barcode stickers", "Thermal paper", "Printers", "Scanners", "Tags", "Labelling solutions"].map((chip) => (
                  <span key={chip} className="rounded-full border border-accent/20 bg-card px-3 py-1.5 text-xs font-bold text-primary/80">{chip}</span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <ButtonLink href="#products" secondary>View Products</ButtonLink>
                <ButtonLink href="#quote">Get a Quote</ButtonLink>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5"><SectionHeading eyebrow="About The Labels" title="A focused partner for labeling and barcode requirements" /></div>
            <div className="space-y-5 text-base leading-7 text-muted-foreground lg:col-span-7">
              <p>The Labels provides barcode and labeling solutions for businesses, including barcode labels, stickers, thermal paper rolls, printed barcodes, jewellery tags, ribbon rolls, barcode scanners and sticker printers.</p>
              <p>Our approach is practical and business-focused: understand the requirement, match the right product or equipment, and provide dependable sales and service support.</p>
              <div className="grid gap-3 pt-2 sm:grid-cols-2">
                <div className="rounded-lg border border-accent/15 bg-card p-5"><p className="font-display font-semibold text-primary">Stick. Identify. Organize.</p><p className="mt-2 text-sm">A clear philosophy for practical product identification.</p></div>
                <div className="rounded-lg border border-accent/15 bg-card p-5"><p className="font-display font-semibold text-primary">Reliable Solutions</p><p className="mt-2 text-sm">For a smarter, more organized tomorrow.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-20">
          <SectionHeading eyebrow="Why The Labels" title="Why Businesses Choose The Labels" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              [ShieldCheck, "Quality Labeling Solutions", "Labels, tags and consumables chosen for dependable everyday use."],
              [PackageCheck, "Reliable Products", "A practical product range covering stickers, paper, ribbons and tags."],
              [Wrench, "Printer & Scanner Support", "Sales and service support for the equipment you run daily."],
              [Sparkles, "Customized Requirements", "Sizes, materials and printing matched to your specific process."],
              [Headphones, "Easy Customer Support", "Straightforward help by call, WhatsApp or email when you need it."],
            ].map(([Icon, title, copy]) => {
              const ChoiceIcon = Icon as typeof ShieldCheck;
              return (
                <article key={title as string} className="rounded-xl border border-border bg-card p-6">
                  <ChoiceIcon className="h-7 w-7 text-accent" />
                  <h3 className="mt-5 font-display text-lg font-semibold leading-6 text-primary">{title as string}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy as string}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-20">
          <SectionHeading eyebrow="Customer Feedback" title="What our customers say" copy="This space is reserved for genuine customer feedback and will be updated with real reviews." />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((slot) => (
              <div key={slot} className="rounded-xl border border-dashed border-primary/20 bg-card/60 p-7">
                <div className="h-2 w-16 rounded-full bg-muted" />
                <p className="mt-5 text-sm leading-6 text-muted-foreground">Customer review coming soon.</p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="h-9 w-9 rounded-full bg-muted" />
                  <span className="h-2 w-24 rounded-full bg-muted" />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Worked with us? <a href="#contact" className="font-bold text-accent underline-offset-4 hover:underline">Share your feedback</a>.
          </p>
        </section>

        <section id="faq" className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-20">
          <SectionHeading eyebrow="FAQ" title="Frequently asked questions" copy="Quick answers about our barcode labels, stickers, printers, scanners and support." />
          <div className="mt-10 grid gap-3 lg:grid-cols-2">
            {faqs.map((item) => (
              <details key={item.q} className="group rounded-xl border border-border bg-card p-5 open:border-accent/40">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-semibold text-primary">
                  {item.q}
                  <ChevronDown className="h-5 w-5 shrink-0 text-accent transition group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-20">
          <div className="grid gap-5 lg:grid-cols-12">
            <div className="rounded-xl bg-primary p-7 text-primary-foreground sm:p-10 lg:col-span-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky">Customer Support</p>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight">Need Help? Talk to Our Support Team.</h2>
              <p className="mt-4 leading-7 text-primary-foreground/70">Have a question about a product, need a quotation, or want to discuss your labeling requirements? Get in touch with The Labels.</p>
              <div className="mt-8 grid gap-3">
                {[
                  [Phone, "Call Us", PHONE_DISPLAY, `tel:${PHONE_LINK}`],
                  [Mail, "Email Us", EMAIL, `mailto:${EMAIL}`],
                  [ScanBarcode, "Website", "www.thelabels.in", SITE_URL],
                  [MapPin, "Location", "Pune, Maharashtra, India", "https://maps.google.com/?q=Pune%2C+India"],
                ].map(([Icon, label, value, href]) => {
                  const ContactIcon = Icon as typeof Phone;
                  const isExternal = (label as string) === "Location" || (label as string) === "Website";
                  return (
                    <a key={label as string} href={href as string} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noreferrer" : undefined} className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 p-4 transition hover:bg-primary-foreground/10">
                      <ContactIcon className="h-5 w-5 shrink-0 text-sky" />
                      <span className="min-w-0"><span className="block text-xs text-primary-foreground/55">{label as string}</span><span className="block truncate text-sm font-bold">{value as string}</span></span>
                    </a>
                  );
                })}
              </div>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <a href={`tel:${PHONE_LINK}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-primary-foreground px-4 font-bold text-primary transition hover:bg-sky"><Phone className="h-5 w-5" />Call Now</a>
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-sky px-4 font-bold text-primary transition hover:bg-primary-foreground"><MessageCircle className="h-5 w-5" />WhatsApp Us</a>
              </div>
            </div>

            <div id="quote" className="glass-panel rounded-xl p-6 sm:p-10 lg:col-span-7">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">Get a Quote</p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-primary">Request a Quote</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">Share your requirement and our team will help identify the right product or service.</p>
              {submitted ? (
                <div role="status" className="mt-8 rounded-lg border border-success/25 bg-success/10 p-6 text-success"><CircleCheck className="h-9 w-9" /><p className="mt-4 font-display text-lg font-semibold">Thank you for contacting The Labels.</p><p className="mt-2 text-sm">Our team will get back to you shortly.</p><button type="button" onClick={() => setSubmitted(false)} className="mt-5 rounded-md bg-success px-4 py-2.5 text-sm font-bold text-success-foreground">Submit another request</button></div>
              ) : (
                <form className="mt-7 grid gap-4 sm:grid-cols-2" onSubmit={submitQuote}>
                  <Field label="Full Name"><input name="name" required maxLength={100} autoComplete="name" className="form-control" placeholder="Your full name" /></Field>
                  <Field label="Company Name"><input name="company" required maxLength={120} autoComplete="organization" className="form-control" placeholder="Your company" /></Field>
                  <Field label="Mobile Number"><input name="mobile" required maxLength={16} pattern="[0-9+() -]{7,16}" inputMode="tel" autoComplete="tel" className="form-control" placeholder="Mobile number" /></Field>
                  <Field label="Email Address"><input name="email" required maxLength={255} type="email" autoComplete="email" className="form-control" placeholder="name@company.com" /></Field>
                  <Field label="Product / Service Required"><select name="product" required value={selectedProduct} onChange={(event) => setSelectedProduct(event.target.value)} className="form-control"><option value="">Select a requirement</option>{productOptions.map((option) => <option key={option}>{option}</option>)}</select></Field>
                  <Field label="Quantity"><input name="quantity" maxLength={50} className="form-control" placeholder="Approximate quantity" /></Field>
                  <Field label="Message / Requirement" wide><textarea name="message" required maxLength={1000} rows={5} className="form-control resize-y" placeholder="Tell us about sizes, materials, quantities or equipment needs" /></Field>
                  <button type="submit" className="min-h-12 rounded-md bg-accent px-6 py-3 text-sm font-bold text-accent-foreground transition hover:bg-primary sm:col-span-2">Request Quote</button>
                  <p className="text-xs leading-5 text-muted-foreground sm:col-span-2">This form currently confirms your request on screen and is ready for future email or enquiry integration.</p>
                </form>
              )}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-20">
          <div className="diagonal-detail relative overflow-hidden rounded-xl bg-accent p-8 text-accent-foreground sm:p-12">
            <div className="relative grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto]">
              <div>
                <h2 className="max-w-2xl font-display text-3xl font-semibold leading-tight sm:text-4xl">Let’s Find the Right Label Solution for Your Business.</h2>
                <p className="mt-4 max-w-2xl leading-7 text-accent-foreground/75">Tell us what you need and our team will help you find the right barcode, label, printer or scanning solution.</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a href="#quote" className="inline-flex min-h-12 items-center justify-center rounded-md bg-accent-foreground px-6 font-bold text-accent transition hover:bg-sky">Get a Quote</a>
                <a href="#contact" className="inline-flex min-h-12 items-center justify-center rounded-md border border-accent-foreground/30 px-6 font-bold transition hover:bg-accent-foreground/10">Contact Support</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-primary/10 bg-background/75">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-6 md:grid-cols-4">
          <div className="md:col-span-2">
            <BrandMark />
            <p className="mt-5 max-w-sm text-sm leading-6 text-muted-foreground">Barcode labels, stickers, thermal paper rolls, tags, sticker printers and barcode scanners for businesses in Pune and across India.</p>
            <p className="mt-3 font-display text-sm font-semibold text-primary">Quality Labels for a Smarter Tomorrow</p>
          </div>
          <div>
            <h3 className="font-display font-semibold text-primary">Quick Links</h3>
            <div className="mt-4 grid gap-3 text-sm text-muted-foreground">
              {navItems.map(([label, href]) => <a key={href} href={href} className="hover:text-accent">{label}</a>)}
              <a href="#quote" className="hover:text-accent">Get a Quote</a>
            </div>
          </div>
          <div>
            <h3 className="font-display font-semibold text-primary">Contact</h3>
            <div className="mt-4 grid gap-3 text-sm text-muted-foreground">
              <a href={`tel:${PHONE_LINK}`} className="hover:text-accent">{PHONE_DISPLAY}</a>
              <a href={`mailto:${EMAIL}`} className="hover:text-accent">{EMAIL}</a>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="hover:text-accent">WhatsApp</a>
              <span>Pune, Maharashtra, India</span>
              <a href={SITE_URL} className="hover:text-accent">www.thelabels.in</a>
            </div>
          </div>
        </div>
        <div className="border-t border-primary/10 px-5 py-5 text-center text-xs text-muted-foreground">© The Labels. All Rights Reserved.</div>
      </footer>

      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 sm:bottom-5 sm:right-5">
        {supportOpen && (
          <div className="glass-panel w-56 rounded-lg p-2" role="menu">
            <QuickAction href={`tel:${PHONE_LINK}`} icon={Phone} label="Call Us" />
            <QuickAction href={WHATSAPP_URL} icon={MessageCircle} label="WhatsApp" external />
            <QuickAction href={`mailto:${EMAIL}`} icon={Mail} label="Email" />
            <QuickAction href="#quote" icon={Wrench} label="Request a Quote" onClick={() => setSupportOpen(false)} />
          </div>
        )}
        <button type="button" onClick={() => setSupportOpen((value) => !value)} aria-expanded={supportOpen} className="support-pulse inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-xl transition hover:bg-accent sm:px-5"><Headphones className="h-5 w-5" />Contact Support<ChevronDown className={`h-4 w-4 transition ${supportOpen ? "rotate-180" : ""}`} /></button>
      </div>
    </div>
  );
}

function Field({ label, children, wide = false }: { label: string; children: ReactNode; wide?: boolean }) {
  return <label className={`grid gap-1.5 text-sm font-bold text-primary ${wide ? "sm:col-span-2" : ""}`}><span>{label}</span>{children}</label>;
}

function QuickAction({ href, icon: Icon, label, external = false, onClick }: { href: string; icon: typeof Phone; label: string; external?: boolean; onClick?: () => void }) {
  return <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} onClick={onClick} role="menuitem" className="flex min-h-11 items-center gap-3 rounded-md px-3 text-sm font-bold text-primary transition hover:bg-muted"><Icon className="h-4 w-4 text-accent" />{label}</a>;
}
