import { useState, useEffect } from "react";
import "./Projects.css"; // Import the CSS file for styling
import purpleGithubLogo from "../assets/purpleGithubLogo.png";
import githubLogo from "../assets/GithubLogo.png";

export default function Projects() {
	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [isDarkTheme, setIsDarkTheme] = useState(
		document.body.classList.contains("dark-theme")
	);

	useEffect(() => {
		const fetchRepos = async () => {
			try {
				const token = import.meta.env.VITE_GITHUB_TOKEN;
				const response = await fetch(
					"https://api.github.com/users/MiguelPereira05/repos",
					{
						headers: token ? { Authorization: `token ${token}` } : {}
					}
				);
				const data = await response.json();

				if (!response.ok) {
					console.error("GitHub API error:", response.status, data);
					setLoading(false);
					return;
				}

				// Filter out private repositories
				const publicRepos = data.filter((repo) => !repo.private);
				setRepos(publicRepos);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching repositories:", error);
				setLoading(false);
			}
		};

		fetchRepos();
	}, []);

	// Listen for theme changes
	useEffect(() => {
		const observer = new MutationObserver(() => {
			const isDark = document.body.classList.contains("dark-theme");
			setIsDarkTheme(isDark);
		});

		observer.observe(document.body, {
			attributes: true,
			attributeFilter: ["class"]
		});

		return () => observer.disconnect();
	}, []);

	return (
		<section className="projects-section" id="projects">
			<h2 id="projects-title">Latest<span>Projects</span></h2>
			{loading ? (
				<p>Loading projects...</p>
			) : repos.length > 0 ? (
				<div className="projects-grid">
					{repos.map((repo) => (
						<div
							className="project-card"
							key={repo.id}
							style={{
								backgroundImage: `url(${isDarkTheme ? githubLogo : purpleGithubLogo})`,
								backgroundRepeat: 'no-repeat',
								backgroundPosition: 'center center',
								backgroundSize: 'cover'
							}}
						>
							<h3>{repo.name}</h3>
							<p>{repo.description || "No description available."}</p>
							<a
								href={repo.html_url}
								target="_blank"
								rel="noopener noreferrer"
							>
								View Repository
							</a>
						</div>
					))}
				</div>
			) : (
				<p>No repositories found.</p>
			)}
		</section>
	);
}
