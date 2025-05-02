import {
  LayoutDashboard,
  Newspaper,
  RefreshCcw,
  StickyNote,
  BriefcaseBusiness,
  Map,
  MessageCircleQuestion,
  FileQuestion,
  Cog,
  Briefcase,
  NotebookPen,
  BookCheck,
  UserRoundPen,
  Box,
  Settings,
} from "lucide-react";

export const sidebarContent = [
  { title: "Dashboard", href: "/", logo: LayoutDashboard, subMenu: [] },
  { title: "Article", href: "/articles", logo: Newspaper, subMenu: [] },
  {
    title: "Auto Dealership",
    href: "/dealership",
    logo: RefreshCcw,
    subMenu: [],
  },
  {
    title: "Blog",
    href: "/blog",
    logo: StickyNote,
    subMenu: [
      { title: "Blog Category", href: "/blog/category" },
      { title: "Blog Page", href: "/blog/page" },
      { title: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Career",
    href: "/career",
    logo: BriefcaseBusiness,
    subMenu: [
      { title: "Career", href: "/career" },
      { title: "Career Openings", href: "/career/openings" },
      { title: "Career Opening Category", href: "/career/category" },
    ],
  },
  { title: "Country, State, City", href: "/place", logo: Map, subMenu: [] },
  { title: "FAQ's", href: "/faq", logo: FileQuestion, subMenu: [] },
  {
    title: "Free Shop News",
    href: "/news",
    logo: Newspaper,
    subMenu: [
      { title: "Free Shop News Category", href: "/news/category" },
      { title: "Free Shop News", href: "/news" },
    ],
  },
  {
    title: "Help Center",
    href: "/help",
    logo: MessageCircleQuestion,
    subMenu: [
      { title: "Category", href: "/help/category" },
      { title: "Help Center Knowledge Base", href: "/help/knowledge-base" },
    ],
  },
  {
    title: "How it works",
    href: "/tutorial",
    logo: Cog,
    subMenu: [
      { title: "Add How it Works", href: "/tutorial/add" },
      { title: "Add Button Data in HIW", href: "/tutorial/button-data" },
    ],
  },
  {
    title: "Jobs",
    href: "/job",
    logo: Briefcase,
    subMenu: [
      { title: "Service Category", href: "/job/category" },
      { title: "Jobs", href: "/job" },
    ],
  },
  {
    title: "Press",
    href: "/press",
    logo: NotebookPen,
    subMenu: [
      { title: "Press News Category", href: "/press/category" },
      { title: "Press Topic", href: "/press/topic" },
      { title: "Press News", href: "/press/news" },
      { title: "Press Offer Up News", href: "/press/offer-up" },
      { title: "Press", href: "/press" },
    ],
  },
  { title: "Product", href: "/product", logo: BookCheck, subMenu: [] },
  {
    title: "Trust and Safety",
    href: "/trust",
    logo: UserRoundPen,
    subMenu: [
      { title: "Add", href: "/trust/add" },
      { title: "Add Bottom Data", href: "/trust/bottom-data" },
      { title: "List", href: "/trust/list" },
    ],
  },
  { title: "User Management", href: "/user", logo: UserRoundPen, subMenu: [] },
  { title: "Order", href: "/order", logo: Box, subMenu: [] },
  { title: "Settings", href: "/settings", logo: Settings, subMenu: [] },
];

