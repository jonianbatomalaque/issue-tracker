import React from "react";
import { GetServerSideProps } from "next";

interface Props {
  status: string | null;
}

const PlanholderPage = ({ status }: Props) => {
  console.log(status);
  return <div>Status: {status}</div>;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const status = Array.isArray(context.query.status)
    ? context.query.status[0]
    : context.query.status || null;

  return {
    props: {
      status,
    },
  };
};

export default PlanholderPage;
