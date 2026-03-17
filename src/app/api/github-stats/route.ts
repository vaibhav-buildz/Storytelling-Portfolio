import { NextResponse } from "next/server";

const GITHUB_USERNAME = "vaibhav-buildz";

// Cache and revalidate once per day (86400 seconds)
export const revalidate = 86400;

export async function GET() {
    try {
        // Fetch contribution data from the same public API react-github-calendar uses
        const [contribRes, userRes] = await Promise.all([
            fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`, {
                next: { revalidate: 86400 },
            }),
            fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
                headers: { "Accept": "application/vnd.github+json" },
                next: { revalidate: 86400 },
            }),
        ]);

        const contribData = await contribRes.json();
        const userData = await userRes.json();

        const contributions: { date: string; count: number; level: number }[] =
            contribData.contributions ?? [];

        const commits = contributions.reduce((sum, d) => sum + d.count, 0);
        const daysActive = contributions.filter((d) => d.count > 0).length;
        const repos = userData.public_repos ?? 0;

        return NextResponse.json(
            { commits, repos, daysActive },
            {
                headers: {
                    // Tell the browser to treat this as fresh for up to 1 hour,
                    // but Vercel's edge cache will hold it for the full 24 hours
                    "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
                },
            }
        );
    } catch (err) {
        console.error("GitHub stats fetch failed:", err);
        return NextResponse.json(
            { commits: 0, repos: 0, daysActive: 0 },
            { status: 500 }
        );
    }
}
