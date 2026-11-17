"use client";

import Image from "next/image";
import {
  ArrowRight,
  CalendarBlank,
  CarProfile,
  Check,
  Clock,
  GasPump,
  List,
  MapPin,
  ShieldCheck,
  Sparkle,
  Star,
  SteeringWheel,
  SuitcaseSimple,
  X,
} from "@phosphor-icons/react";
import { FormEvent, useMemo, useState } from "react";

const cars = [
  {
    name: "Aster GT",
    category: "Sport",
    price: 168,
    color: "cobalt",
    image: "/car-aster-gt.png",
    blurb: "For the road worth remembering.",
    stats: ["2 seats", "Automatic", "Premium"],
  },
  {
    name: "Nord S7",
    category: "Luxury",
    price: 132,
    color: "pearl",
    image: "/car-nord-s7.png",
    blurb: "Quiet confidence, beautifully composed.",
    stats: ["5 seats", "Automatic", "Hybrid"],
  },
  {
    name: "Roam X",
    category: "SUV",
    price: 119,
    color: "forest",
    image: "/car-roam-x.png",
    blurb: "Made for bigger plans.",
    stats: ["7 seats", "Automatic", "AWD"],
  },
];

const categories = ["All", "Luxury", "SUV", "Sport"];

export default function Home() {
  const [category, setCategory] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [booking, setBooking] = useState<(typeof cars)[number] | null>(null);
  const [notice, setNotice] = useState("");
  const [location, setLocation] = useState("Colombo City Centre");
  const [pickup, setPickup] = useState("2026-12-04");
  const [dropoff, setDropoff] = useState("2026-12-08");

  const filteredCars = useMemo(
    () => (category === "All" ? cars : cars.filter((car) => car.category === category)),
    [category]
  );

  function searchCars(event: FormEvent) {
    event.preventDefault();
    document.getElementById("fleet")?.scrollIntoView({ behavior: "smooth" });
    setNotice(`Showing cars near ${location} · ${pickup} to ${dropoff}`);
    window.setTimeout(() => setNotice(""), 5000);
  }

  function confirmBooking(event: FormEvent) {
    event.preventDefault();
    const carName = booking?.name;
    setBooking(null);
    setNotice(`${carName} is held for you. We’ll send the trip details shortly.`);
    window.setTimeout(() => setNotice(""), 5000);
  }

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Drivana home">
          <span className="brand-mark"><SteeringWheel weight="fill" /></span>
          <span>DRIVANA</span>
        </a>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Primary navigation">
          <a href="#fleet" onClick={() => setMenuOpen(false)}>The fleet</a>
          <a href="#experience" onClick={() => setMenuOpen(false)}>Why Drivana</a>
          <a href="#journey" onClick={() => setMenuOpen(false)}>How it works</a>
          <button className="nav-book" onClick={() => { setBooking(cars[1]); setMenuOpen(false); }}>Book a car <ArrowRight /></button>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X /> : <List />}
        </button>
      </header>

      <section className="hero" id="top">
        <Image src="/drivana-hero.png" alt="Midnight blue luxury car overlooking the ocean" fill preload sizes="100vw" />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow"><span /> Drive beyond ordinary</p>
          <h1>Your journey.<br /><em>Elevated.</em></h1>
          <p className="hero-intro">Exceptional cars, thoughtfully selected. Seamless from the first tap to the final mile.</p>
        </div>
        <div className="hero-index"><b>01</b><span /><small>COASTAL<br />COLLECTION</small></div>
      </section>

      <form className="search-panel" onSubmit={searchCars}>
        <label>
          <span><MapPin /> Pick-up location</span>
          <select value={location} onChange={(e) => setLocation(e.target.value)}>
            <option>Colombo City Centre</option>
            <option>Bandaranaike Airport</option>
            <option>Galle Fort</option>
            <option>Kandy Station</option>
          </select>
        </label>
        <label>
          <span><CalendarBlank /> Pick-up</span>
          <input type="date" value={pickup} onChange={(e) => setPickup(e.target.value)} min="2026-11-17" required />
        </label>
        <label>
          <span><CalendarBlank /> Return</span>
          <input type="date" value={dropoff} onChange={(e) => setDropoff(e.target.value)} min={pickup} required />
        </label>
        <button type="submit">Find your drive <ArrowRight weight="bold" /></button>
      </form>

      <section className="fleet section" id="fleet">
        <div className="section-heading">
          <div>
            <p className="eyebrow dark"><span /> Curated for every road</p>
            <h2>Choose your<br /><em>kind of freedom.</em></h2>
          </div>
          <p>From spirited city runs to room-for-everything escapes, every car in our collection earns its place.</p>
        </div>
        <div className="filter-row" role="group" aria-label="Filter vehicles">
          {categories.map((item) => (
            <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>
          ))}
        </div>
        <div className="car-grid">
          {filteredCars.map((car, index) => (
            <article className={`car-card ${car.color}`} key={car.name}>
              <div className="car-top">
                <span>0{index + 1}</span>
                <span>{car.category}</span>
              </div>
              <div className="car-art">
                <Image
                  src={car.image}
                  alt={`${car.name} ${car.category} rental car`}
                  fill
                  sizes="(max-width: 900px) 88vw, 30vw"
                />
              </div>
              <div className="car-copy">
                <p>{car.blurb}</p>
                <h3>{car.name}</h3>
                <div className="stats">
                  <span><CarProfile /> {car.stats[0]}</span>
                  <span><SteeringWheel /> {car.stats[1]}</span>
                  <span><GasPump /> {car.stats[2]}</span>
                </div>
                <div className="price"><span>from <b>${car.price}</b> / day</span><button onClick={() => setBooking(car)} aria-label={`Book ${car.name}`}><ArrowRight /></button></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="experience" id="experience">
        <div className="experience-copy">
          <p className="eyebrow"><span /> The Drivana difference</p>
          <h2>Less rental.<br /><em>More remarkable.</em></h2>
          <p>We removed the queues, the fine print, and the uncertainty. What remains is the simple pleasure of a beautiful car, ready when you are.</p>
          <a href="#journey">See how it works <ArrowRight /></a>
        </div>
        <div className="benefit-stack">
          <article><span>01</span><div><ShieldCheck /><h3>Cover that’s clear</h3><p>Full protection options explained in plain language. No awkward surprises at the counter.</p></div></article>
          <article><span>02</span><div><Clock /><h3>Your time, respected</h3><p>Digital check-in and flexible delivery, because the best trips don’t begin in a queue.</p></div></article>
          <article><span>03</span><div><Sparkle /><h3>Impeccably prepared</h3><p>Every vehicle is inspected, detailed, and reset to our exacting standard before each journey.</p></div></article>
        </div>
      </section>

      <section className="journey section" id="journey">
        <div className="journey-title">
          <p className="eyebrow dark"><span /> Three simple moments</p>
          <h2>From here<br /><em>to anywhere.</em></h2>
        </div>
        <div className="steps">
          <article><span>01</span><MapPin /><h3>Tell us where</h3><p>Choose your dates and the place you’d like your car waiting.</p></article>
          <article><span>02</span><CarProfile /><h3>Pick your pace</h3><p>Select the car that feels right. Everything important is included up front.</p></article>
          <article><span>03</span><SuitcaseSimple /><h3>Just drive</h3><p>We’ll handle the handover. You bring the playlist and a sense of possibility.</p></article>
        </div>
      </section>

      <section className="quote-band">
        <Star weight="fill" /><Star weight="fill" /><Star weight="fill" /><Star weight="fill" /><Star weight="fill" />
        <blockquote>“The first rental experience that felt like part of the holiday—not an obstacle before it.”</blockquote>
        <p>— Mira S. · Galle weekend</p>
      </section>

      <section className="final-cta">
        <p className="eyebrow"><span /> Your next story is waiting</p>
        <h2>Take the scenic route.</h2>
        <button onClick={() => setBooking(cars[0])}>Find your car <ArrowRight /></button>
      </section>

      <footer>
        <div className="brand"><span className="brand-mark"><SteeringWheel weight="fill" /></span><span>DRIVANA</span></div>
        <p>Exceptional cars. Effortless journeys.</p>
        <div><a href="#fleet">Fleet</a><a href="#experience">Experience</a><a href="mailto:hello@drivana.example">Contact</a></div>
        <small>© 2026 Drivana. Demo experience.</small>
      </footer>

      {notice && <div className="toast"><Check weight="bold" /> {notice}</div>}

      {booking && (
        <div className="modal-backdrop" onMouseDown={() => setBooking(null)}>
          <form className="booking-modal" onSubmit={confirmBooking} onMouseDown={(e) => e.stopPropagation()}>
            <button type="button" className="modal-close" onClick={() => setBooking(null)} aria-label="Close"><X /></button>
            <p className="eyebrow dark"><span /> Reserve your drive</p>
            <h2>{booking.name}</h2>
            <p className="modal-sub">From ${booking.price}/day · Free cancellation up to 24 hours before pickup.</p>
            <label>Full name<input placeholder="Alex Morgan" required /></label>
            <label>Email<input type="email" placeholder="alex@example.com" required /></label>
            <div className="modal-dates"><label>Pick-up<input type="date" value={pickup} onChange={(e) => setPickup(e.target.value)} required /></label><label>Return<input type="date" value={dropoff} min={pickup} onChange={(e) => setDropoff(e.target.value)} required /></label></div>
            <button type="submit" className="confirm">Hold this car <ArrowRight /></button>
          </form>
        </div>
      )}
    </main>
  );
}
