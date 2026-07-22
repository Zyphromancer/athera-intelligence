import { defineMcp } from "@lovable.dev/mcp-js";
import listProjects from "./tools/list-projects";
import listCaseStudies from "./tools/list-case-studies";
import getCaseStudy from "./tools/get-case-study";
import listTransformations from "./tools/list-transformations";
import getCompanyInfo from "./tools/get-company-info";
import submitContactInquiry from "./tools/submit-contact-inquiry";
import requestCallBooking from "./tools/request-call-booking";

export default defineMcp({
  name: "athera-intelligence-mcp",
  title: "Athera Intelligence",
  version: "0.1.0",
  instructions:
    "Public MCP server for Athera Intelligence. Use the read-only tools to look up company info, projects, case studies, and before/after transformations. Use submit_contact_inquiry or request_call_booking to send a message or booking request that lands in Athera Intelligence's inbox (same as the website forms).",
  tools: [
    getCompanyInfo,
    listProjects,
    listCaseStudies,
    getCaseStudy,
    listTransformations,
    submitContactInquiry,
    requestCallBooking,
  ],
});