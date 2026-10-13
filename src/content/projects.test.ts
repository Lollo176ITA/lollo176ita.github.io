import { describe, expect, it } from "vitest";
import { projects } from "./projects";

describe("projects", () => {
  it("has unique slugs", () => {
    const slugs = projects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("links every repo to the Lollo176ITA GitHub account", () => {
    for (const project of projects) {
      expect(project.repo).toMatch(/^https:\/\/github\.com\/Lollo176ITA\/[^/]+$/);
    }
  });

  it("uses https for live sites", () => {
    for (const project of projects) {
      if (project.url) expect(project.url).toMatch(/^https:\/\//);
    }
  });

  it("has a description in both languages and a non-empty stack", () => {
    for (const project of projects) {
      expect(project.description.it.trim()).not.toBe("");
      expect(project.description.en.trim()).not.toBe("");
      expect(project.stack.length).toBeGreaterThan(0);
    }
  });
});
