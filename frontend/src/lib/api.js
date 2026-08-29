import axios from "axios";
import { ARTICLES } from "@/data/articles";
import { PROJECTS } from "@/data/projects";

const BASE =
  process.env.REACT_APP_BACKEND_URL ||
  (process.env.NODE_ENV === "development" ? "http://localhost:8000" : "");

export const api = axios.create({
  baseURL: `${BASE}/api`,
  headers: { "Content-Type": "application/json" },
  timeout: 20000,
});

const requireArray = (data, resource) => {
  if (Array.isArray(data)) return data;
  throw new Error(`Invalid ${resource} response`);
};

const requireObject = (data, resource) => {
  if (data && typeof data === "object" && !Array.isArray(data)) return data;
  throw new Error(`Invalid ${resource} response`);
};

/* Submissions ---------------------------------------------------------- */
export const submitEnquiry = (payload) =>
  api.post("/enquiry", payload).then((r) => r.data);

export const submitContact = (payload) =>
  api.post("/contact", payload).then((r) => r.data);

export const submitApplication = (payload) =>
  api.post("/careers/apply", payload).then((r) => r.data);

/* Content -------------------------------------------------------------- */
export const fetchProjects = (vertical) =>
  api
    .get("/projects", { params: vertical && vertical !== "all" ? { vertical } : {} })
    .then((r) => requireArray(r.data, "projects"))
    .catch(() =>
      vertical && vertical !== "all"
        ? PROJECTS.filter((project) => project.vertical_slug === vertical)
        : PROJECTS
    );

export const fetchProject = (slug) =>
  api
    .get(`/projects/${slug}`)
    .then((r) => requireObject(r.data, "project"))
    .catch((error) => {
      const project = PROJECTS.find((item) => item.slug === slug);
      if (project) return project;
      throw error;
    });

export const fetchArticles = (category) =>
  api
    .get("/articles", { params: category && category !== "All" ? { category } : {} })
    .then((r) => requireArray(r.data, "articles"))
    .catch(() =>
      category && category !== "All"
        ? ARTICLES.filter((article) => article.category === category)
        : ARTICLES
    );

export const fetchArticle = (slug) =>
  api
    .get(`/articles/${slug}`)
    .then((r) => requireObject(r.data, "article"))
    .catch((error) => {
      const article = ARTICLES.find((item) => item.slug === slug);
      if (article) return article;
      throw error;
    });

export const fetchJobs = () => api.get("/jobs").then((r) => r.data);

export const fetchJob = (id) => api.get(`/jobs/${id}`).then((r) => r.data);
