import Image from "next/image";
import Pagination from "./components/Pagination";
import LatestIssues from "./LatestIssues";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";
import IssueChart from "./IssueChart";
import { Flex, Grid, Text } from "@radix-ui/themes";
import { Metadata } from "next";

export default async function Home() {
  return <Text>Hello World</Text>;
}
export const metadata: Metadata = {
  title: "Issue Tracket - Dashboard",
  description: "View a summary of project issues",
};
