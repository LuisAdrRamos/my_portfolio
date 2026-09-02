import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projectsCollection = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['backend', 'ai-inference', 'system-tools', 'fullstack']),
    featured: z.boolean().default(false),
    date: z.coerce.date(),
    technologies: z.array(z.string()),
    githubUrl: z.string().url(),
    demoUrl: z.string().url().optional(),
    huggingfaceUrl: z.string().url().optional(),
    metrics: z.record(z.string(), z.string()).optional(),
    image: z.string().optional(),
    problem: z.string().optional(),
    architecture: z.string().optional(),
  }),
});

const timelineCollection = defineCollection({
  loader: glob({ base: './src/content/timeline', pattern: '**/*.{md,mdx,json}' }),
  schema: z.object({
    date: z.string(),
    role: z.string(),
    company: z.string(),
    technologies: z.array(z.string()),
    type: z.enum(['work', 'education']),
    order: z.number()
  }),
});

export const collections = {
  projects: projectsCollection,
  timeline: timelineCollection,
};
