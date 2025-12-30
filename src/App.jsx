import { useState, useEffect } from "react";
import "./App.css";
import Projects from "./components/Projects.jsx";
import Welcome from "./components/Welcome.jsx";
import Navbar from "./components/Navbar.jsx";
import TechStackChart from "./components/TechStackChart.jsx";
import Contact from "./components/Contact.jsx";
import AboutMe from "./components/AboutMe.jsx";

function App() {
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<>
			<Navbar />
			<div>
				<Welcome />
				<AboutMe />
				<Projects />
				<TechStackChart />
				<Contact />
				<footer>
					<div className="footer-content">
						<p>Copyright© 2025 Miguel Pereira. All rights reserved.
						<button onClick={scrollToTop} className="scroll-to-top">
							↑ 
						</button>
						</p>
					</div>
				</footer>
			</div>
		</>
	);
}

export default App;
