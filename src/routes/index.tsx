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
  Tags,
  Wrench,
  X,
} from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";

import barcodeLabelsAsset from "../assets/barcode-labels.jpg.asset.json";
import barcodePrinterAsset from "../assets/barcode-printer.jpg.asset.json";
import barcodeScannerAsset from "../assets/barcode-scanner.jpg.asset.json";
import garmentTagsAsset from "../assets/garment-tags.jpg.asset.json";
import heroProductsAsset from "../assets/hero-products.jpg.asset.json";
import thermalRollsAsset from "../assets/thermal-rolls.jpg.asset.json";

const PHONE_DISPLAY = "+91 97256 62466";
const PHONE_LINK = "+919725662466";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello The Labels, I would like to discuss my barcode/label requirement and get a quotation.",
);

const navItems = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Products", "#products"],
  ["Services", "#services"],
  ["Contact", "#contact"],
] as const;

const productOptions = [
  "Barcode Stickers",
  "Printed Barcode Labels",
  "Plain Barcode Stickers",
  "Jewellery Tags",
  "Clothes / Garment Tags",
  "Thermal Paper Rolls",
  "Sticker Printer",
  "Barcode Printer",
  "Barcode Scanner",
  "Ribbon Rolls",
  "Other",
] as const;

const products = [
  {
    title: "Barcode Stickers & Labels",
    description: "Reliable adhesive labels for clear identification, tracking and everyday operations.",
    items: ["Plain Barcode Stickers", "Printed Barcode Stickers", "Manufacturing Barcode Labels", "Custom Barcode Labels"],
    image: barcodeLabelsAsset.url,
    alt: "Rolls of plain and printed barcode stickers and labels",
    value: "Barcode Stickers",
    span: "lg:col-span-6",
  },
  {
    title: "Clothes / Garment Tags",
    description: "Practical tags for apparel, jewellery, retail products and custom identification.",
    items: ["Jewellery Tags", "Garment Tags", "Product Identification Tags", "Custom Tags"],
    image: garmentTagsAsset.url,
    alt: "Garment, jewellery and product identification tags",
    value: "Clothes / Garment Tags",
    span: "lg:col-span-3",
  },
  {
    title: "Thermal Paper Rolls & Sheets",
    description: "Consistent paper consumables for point-of-sale and business printing workflows.",
    items: ["Thermal Paper Rolls", "Paper Rolls", "Sheets", "Business Printing Consumables"],
    image: thermalRollsAsset.url,
    alt: "Thermal paper rolls and sheets in business printing sizes",
    value: "Thermal Paper Rolls",
    span: "lg:col-span-3",
  },
  {
    title: "Sticker & Barcode Printers",
    description: "Dependable printer solutions selected around your label type and workflow.",
    items: ["Sticker Printers", "Barcode Label Printers", "Printer-related Solutions"],
    image: barcodePrinterAsset.url,
    alt: "Desktop barcode and sticker label printer",
    value: "Barcode Printer",
    span: "lg:col-span-5",
  },
  {
    title: "Barcode Scanners",
    description: "Professional scanning equipment for fast, accurate barcode capture.",
    items: ["Handheld Barcode Scanners", "Barcode Scanning Solutions"],
    image: barcodeScannerAsset.url,
    alt: "Professional handheld barcode scanner",
    value: "Barcode Scanner",
    span: "lg:col-span-7",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Labels | Barcode Labels, Printers & Scanners Pune" },
      {
        name: "description",
        content: "The Labels provides barcode labels, stickers, thermal paper rolls, jewellery tags, sticker printers and barcode scanners in Pune.",
      },
      { property: "og:title", content: "The Labels | Barcode Labels, Printers & Scanners Pune" },
      {
        property: "og:description",
        content: "Reliable barcode labels, stickers, tags, printers and scanners with sales, service and support in Pune.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#home" className="flex min-w-0 items-center gap-3" aria-label="The Labels home">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground">
        <Barcode className="h-6 w-6" strokeWidth={2.2} />
      </span>
      <span className="min-w-0 leading-none">
        <span className="block truncate font-display text-lg font-bold text-primary">The Labels</span>
        {!compact && <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.17em] text-accent">Stick. Identify. Organize.</span>}
      </span>
    </a>
  );
}

function ButtonLink({ href, children, secondary = false, className = "" }: { href: string; children: React.ReactNode; secondary?: boolean; className?: string }) {
  return (
    <a
      href={href}
      className={`${secondary ? "border border-primary/15 bg-card text-primary hover:border-accent/50 hover:bg-background" : "bg-accent text-accent-foreground shadow-sm hover:bg-primary"} inline-flex min-h-11 items-center justify-center rounded-md px-5 py-2.5 text-sm font-bold transition duration-200 hover:-translate-y-0.5 ${className}`}
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
      <header className="sticky top-0 z-50 px-3 sm:px-6">
        <div className={`glass-panel mx-auto mt-2 max-w-7xl rounded-lg px-4 transition-all duration-200 sm:px-5 ${scrolled ? "py-2 shadow-lg" : "py-3"}`}>
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 lg:flex lg:justify-between">
            <BrandMark compact={scrolled} />
            <nav aria-label="Primary navigation" className="hidden items-center gap-7 lg:flex">
              {navItems.map(([label, href]) => <a key={href} href={href} className="text-sm font-semibold text-primary/70 transition hover:text-accent">{label}</a>)}
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
              {navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="rounded-md px-3 py-3 text-sm font-bold text-primary hover:bg-muted">{label}</a>)}
              <a href="#quote" onClick={() => setMenuOpen(false)} className="mt-1 rounded-md bg-accent px-3 py-3 text-center text-sm font-bold text-accent-foreground sm:hidden">Get a Quote</a>
            </nav>
          )}
        </div>
      </header>

      <main>
        <section id="home" className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 pb-20 pt-14 sm:px-6 lg:grid-cols-12 lg:pt-20">
          <div className="lg:col-span-6">
            <div className="rise inline-flex items-center gap-2 rounded-full border border-accent/20 bg-card px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-sky" /> Pune · Labeling & Barcode Solutions
            </div>
            <div className="rise rise-delay-1 mt-6"><BrandMark /></div>
            <h1 className="rise rise-delay-2 mt-7 max-w-[17ch] font-display text-4xl font-semibold leading-[1.1] text-primary sm:text-5xl lg:text-[3.35rem]">Reliable Label &amp; Barcode Solutions for Your Business</h1>
            <p className="rise rise-delay-3 mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">From barcode labels and stickers to sticker printers and barcode scanners, The Labels provides reliable solutions to help businesses stick, identify and organize.</p>
            <div className="rise rise-delay-3 mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#quote">Get a Quote</ButtonLink>
              <ButtonLink href="#contact" secondary>Contact Support</ButtonLink>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">Sales &amp; support · <a className="font-bold text-accent" href={`tel:${PHONE_LINK}`}>{PHONE_DISPLAY}</a></p>
          </div>
          <div className="lg:col-span-6">
            <div className="glass-panel relative overflow-hidden rounded-xl p-3 sm:p-4">
              <img src={heroProductsAsset.url} width={1408} height={912} alt="Barcode printer, scanner, barcode label rolls and garment tags" className="aspect-[14/9] w-full rounded-lg object-cover" fetchPriority="high" />
              <div className="absolute bottom-6 left-6 rounded-md bg-primary/90 px-4 py-3 text-primary-foreground backdrop-blur-md">
                <p className="font-display text-sm font-semibold">STICK. IDENTIFY. ORGANIZE.</p>
                <p className="mt-1 text-xs text-primary-foreground/75">Reliable Solutions for a Smarter Tomorrow</p>
              </div>
            </div>
          </div>
        </section>

        <section id="products" className="mx-auto max-w-7xl px-5 py-20 sm:px-6">
          <SectionHeading eyebrow="Our Products" title="Products built around everyday business needs" copy="Quality labeling and barcode products for everyday business needs." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
            {products.map((product) => (
              <article key={product.title} className={`glass-panel group flex flex-col overflow-hidden rounded-xl p-4 transition duration-200 hover:-translate-y-1 ${product.span}`}>
                <img src={product.image} width={912} height={736} loading="lazy" alt={product.alt} className="aspect-[16/10] w-full rounded-lg object-cover" />
                <div className="flex flex-1 flex-col px-1 pb-1 pt-5">
                  <h3 className="font-display text-xl font-semibold text-primary">{product.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{product.description}</p>
                  <ul className="mt-4 grid gap-2 text-sm text-primary/75 sm:grid-cols-2">
                    {product.items.map((item) => <li key={item} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{item}</li>)}
                  </ul>
                  <button type="button" onClick={() => enquire(product.value)} className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground transition hover:bg-primary sm:w-fit">Enquire Now</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-5 py-20 sm:px-6">
          <div className="glass-panel diagonal-detail grid gap-10 rounded-xl p-6 sm:p-10 lg:grid-cols-12 lg:p-12">
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

        <section id="services" className="mx-auto max-w-7xl px-5 py-20 sm:px-6">
          <SectionHeading eyebrow="Our Services" title="Sales and service that keep your operations moving" copy="Support for the labeling equipment and consumables your business relies on." />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              [ScanBarcode, "All Types of Barcode Scanner Sales & Service", "Select, set up and maintain barcode scanners suited to your workflow and scanning requirements.", "Barcode Scanner"],
              [Printer, "All Types of Sticker Printer Sales & Service", "Practical sales and service support for sticker and barcode label printing equipment.", "Sticker Printer"],
              [Tags, "All Types of Barcode Stickers Sales", "Plain, printed, custom and manufacturing barcode labels supplied around your business needs.", "Barcode Stickers"],
            ].map(([Icon, title, copy, value]) => {
              const ServiceIcon = Icon as typeof ScanBarcode;
              return <article key={title as string} className="glass-panel diagonal-detail flex flex-col rounded-xl p-7"><span className="grid h-12 w-12 place-items-center rounded-md bg-primary text-primary-foreground"><ServiceIcon className="h-6 w-6" /></span><h3 className="mt-6 font-display text-xl font-semibold leading-7 text-primary">{title as string}</h3><p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{copy as string}</p><button type="button" onClick={() => enquire(value as string)} className="mt-6 min-h-11 rounded-md border border-primary/15 bg-card px-4 py-2.5 text-sm font-bold text-primary transition hover:border-accent/50 hover:text-accent">Discuss Your Requirement</button></article>;
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6">
          <SectionHeading eyebrow="Why The Labels" title="Why Choose The Labels?" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [ShieldCheck, "Reliable Solutions", "Solutions selected with dependable day-to-day business use in mind."],
              [PackageCheck, "Quality Products", "Professional label, tag, paper and hardware options for varied requirements."],
              [Headphones, "Business-Focused Support", "Clear assistance for product questions, quotations and service requirements."],
              [Barcode, "Complete Barcode Solutions", "Labels, printers and scanners brought together through one business partner."],
            ].map(([Icon, title, copy]) => {
              const ChoiceIcon = Icon as typeof ShieldCheck;
              return <article key={title as string} className="rounded-xl border border-border bg-card p-6"><ChoiceIcon className="h-7 w-7 text-accent" /><h3 className="mt-5 font-display text-lg font-semibold text-primary">{title as string}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{copy as string}</p></article>;
            })}
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-5 py-20 sm:px-6">
          <div className="grid gap-5 lg:grid-cols-12">
            <div className="rounded-xl bg-primary p-7 text-primary-foreground sm:p-10 lg:col-span-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky">Customer Support</p>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight">Need Help? Talk to Our Support Team.</h2>
              <p className="mt-4 leading-7 text-primary-foreground/70">Have a question about a product, need a quotation, or want to discuss your labeling requirements? Get in touch with The Labels.</p>
              <div className="mt-8 grid gap-3">
                {[
                  [Phone, "Call Us", PHONE_DISPLAY, `tel:${PHONE_LINK}`],
                  [Mail, "Email Us", "info@thelabels.in", "mailto:info@thelabels.in"],
                  [ScanBarcode, "Website", "www.thelabels.in", "https://www.thelabels.in"],
                  [MapPin, "Location", "Pune, India", "https://maps.google.com/?q=Pune%2C+India"],
                ].map(([Icon, label, value, href]) => {
                  const ContactIcon = Icon as typeof Phone;
                  return <a key={label as string} href={href as string} target={(label as string) === "Location" || (label as string) === "Website" ? "_blank" : undefined} rel="noreferrer" className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 p-4 transition hover:bg-primary-foreground/10"><ContactIcon className="h-5 w-5 shrink-0 text-sky" /><span className="min-w-0"><span className="block text-xs text-primary-foreground/55">{label as string}</span><span className="block truncate text-sm font-bold">{value as string}</span></span></a>;
                })}
              </div>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <a href={`tel:${PHONE_LINK}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-primary-foreground px-4 font-bold text-primary transition hover:bg-sky"><Phone className="h-5 w-5" />Call Now</a>
                <a href={`https://wa.me/${PHONE_LINK.replace("+", "")}?text=${WHATSAPP_MESSAGE}`} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-sky px-4 font-bold text-primary transition hover:bg-primary-foreground"><MessageCircle className="h-5 w-5" />WhatsApp Us</a>
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

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6">
          <div className="diagonal-detail relative overflow-hidden rounded-xl bg-accent p-8 text-accent-foreground sm:p-12">
            <div className="relative grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto]">
              <div><h2 className="max-w-2xl font-display text-3xl font-semibold leading-tight sm:text-4xl">Let’s Find the Right Label Solution for Your Business.</h2><p className="mt-4 max-w-2xl leading-7 text-accent-foreground/75">Tell us what you need and our team will help you find the right barcode, label, printer or scanning solution.</p></div>
              <div className="flex flex-col gap-3 sm:flex-row"><a href="#quote" className="inline-flex min-h-12 items-center justify-center rounded-md bg-accent-foreground px-6 font-bold text-accent transition hover:bg-sky">Get a Quote</a><a href="#contact" className="inline-flex min-h-12 items-center justify-center rounded-md border border-accent-foreground/30 px-6 font-bold transition hover:bg-accent-foreground/10">Contact Support</a></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-primary/10 bg-background/75">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-6 md:grid-cols-3">
          <div><BrandMark /><p className="mt-5 max-w-sm text-sm leading-6 text-muted-foreground">Reliable Solutions for a Smarter Tomorrow.</p><p className="mt-2 font-display text-sm font-semibold text-primary">Quality Labels for a Smarter Tomorrow</p></div>
          <div><h3 className="font-display font-semibold text-primary">Quick Links</h3><div className="mt-4 grid grid-cols-2 gap-3 text-sm text-muted-foreground">{navItems.map(([label, href]) => <a key={href} href={href} className="hover:text-accent">{label}</a>)}</div></div>
          <div><h3 className="font-display font-semibold text-primary">Contact</h3><div className="mt-4 grid gap-3 text-sm text-muted-foreground"><a href={`tel:${PHONE_LINK}`} className="hover:text-accent">{PHONE_DISPLAY}</a><a href="mailto:info@thelabels.in" className="hover:text-accent">info@thelabels.in</a><span>Pune, India</span><a href="https://www.thelabels.in" className="hover:text-accent">www.thelabels.in</a></div></div>
        </div>
        <div className="border-t border-primary/10 px-5 py-5 text-center text-xs text-muted-foreground">© The Labels. All Rights Reserved.</div>
      </footer>

      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 sm:bottom-5 sm:right-5">
        {supportOpen && <div className="glass-panel w-56 rounded-lg p-2" role="menu"><QuickAction href={`tel:${PHONE_LINK}`} icon={Phone} label="Call Us" /><QuickAction href={`https://wa.me/${PHONE_LINK.replace("+", "")}?text=${WHATSAPP_MESSAGE}`} icon={MessageCircle} label="WhatsApp" external /><QuickAction href="mailto:info@thelabels.in" icon={Mail} label="Email" /><QuickAction href="#quote" icon={Wrench} label="Request a Quote" onClick={() => setSupportOpen(false)} /></div>}
        <button type="button" onClick={() => setSupportOpen((value) => !value)} aria-expanded={supportOpen} className="support-pulse inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-xl transition hover:bg-accent sm:px-5"><Headphones className="h-5 w-5" />Contact Support<ChevronDown className={`h-4 w-4 transition ${supportOpen ? "rotate-180" : ""}`} /></button>
      </div>
    </div>
  );
}

function Field({ label, children, wide = false }: { label: string; children: React.ReactNode; wide?: boolean }) {
  return <label className={`grid gap-1.5 text-sm font-bold text-primary ${wide ? "sm:col-span-2" : ""}`}><span>{label}</span>{children}</label>;
}

function QuickAction({ href, icon: Icon, label, external = false, onClick }: { href: string; icon: typeof Phone; label: string; external?: boolean; onClick?: () => void }) {
  return <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} onClick={onClick} role="menuitem" className="flex min-h-11 items-center gap-3 rounded-md px-3 text-sm font-bold text-primary transition hover:bg-muted"><Icon className="h-4 w-4 text-accent" />{label}</a>;
}