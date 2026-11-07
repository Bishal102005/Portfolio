import { NextResponse } from 'next/server';
import { ME, INTRO, PROJ, SK, TOOLS, TL, NAMES, LABEL, NAV } from '@/lib/constants/portfolioData';

export async function GET() {
  return NextResponse.json({
    status: 'success',
    data: {
      author: ME,
      intro: INTRO,
      projects: PROJ,
      skills: SK,
      tools: TOOLS,
      timeline: TL,
      structure: {
        names: NAMES,
        labels: LABEL,
        navigation: NAV
      }
    }
  });
}
