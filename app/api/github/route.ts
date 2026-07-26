import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const username = 'purvik08';
    const [profileRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers: { Accept: 'application/vnd.github.v3+json' },
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`, {
        headers: { Accept: 'application/vnd.github.v3+json' },
        next: { revalidate: 3600 },
      }),
    ]);

    const profile = await profileRes.json();
    const repos = await reposRes.json();

    return NextResponse.json({
      public_repos: profile.public_repos || 0,
      followers: profile.followers || 0,
      following: profile.following || 0,
      repos: Array.isArray(repos)
        ? repos.map((r: { name: string; stargazers_count: number; forks_count: number; language: string; html_url: string; description: string }) => ({
            name: r.name,
            stars: r.stargazers_count,
            forks: r.forks_count,
            language: r.language,
            url: r.html_url,
            description: r.description,
          }))
        : [],
    });
  } catch (err) {
    console.error('[GitHub API Error]', err);
    return NextResponse.json({ error: 'Failed to fetch GitHub data' }, { status: 500 });
  }
}
