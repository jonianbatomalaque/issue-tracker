"use client";
import { Button, TextField, Callout, Text } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchema";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { Issue } from "@prisma/client";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueFormData = z.infer<typeof createIssueSchema>;

const NewIssuePage = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubbmitting] = useState(false);
  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubbmitting(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setSubbmitting(false);
      setError("Unexpected error occured.");
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form className="max-w-xl space-y-3" onSubmit={onSubmit}>
        <TextField.Root
          defaultValue={issue?.title}
          placeholder="Title"
          {...register("title")}
        >
          <TextField.Slot></TextField.Slot>
        </TextField.Root>
        <ErrorMessage>{errors.title?.message} </ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message} </ErrorMessage>

        <Button disabled={isSubmitting}>
          Submit New Issue
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;