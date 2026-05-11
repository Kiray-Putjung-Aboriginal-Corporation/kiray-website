"use client";

import React from "react";
import {Form} from "@heroui/form";
import {Input, Textarea} from "@heroui/input";
import {Button} from "@heroui/button";


export default function () {
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [statusMessage, setStatusMessage] = React.useState<string | null>(null);


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;

        setIsSubmitting(true);
        setStatusMessage(null);

        const formData = new FormData(form);

        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            subject: formData.get("subject"),
            message: formData.get("message"),
        };

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                setStatusMessage("Sorry something went wrong please try again");
                return;
            }

            setStatusMessage("Thank you. Your message has been sent.");
            form.reset();
        } catch {
            setStatusMessage("Sorry, something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }

    }

    //todo:aria labels for accessablility
    return (
        <div className="w-full bg-backgroundAlt flex justify-center py-10 px-4">
            <Form className="w-full max-w-md flex flex-col gap-5 items-stretch"
                  onSubmit={onSubmit}>
                <Input
                    classNames={{
                        label: "!text-textLight text-2xl font-medium text-left",
                        base: "w-full text-left"
                    }}
                    isRequired
                    errorMessage={"Please enter a name?"}
                    label="Name"
                    name="name"
                    labelPlacement={"outside"}
                    placeholder={"Your name here"}
                    type="text"
                />
                <Input
                    classNames={{
                        label: "!text-textLight text-2xl font-medium text-left",
                        base: "w-full text-left"
                    }}
                    isRequired
                    errorMessage={"Please enter a valid email address"}
                    label="Email"
                    name="email"
                    labelPlacement={"outside"}
                    placeholder={"Enter your email"}
                    type="email"
                />
                <Input
                    classNames={{
                        label: "!text-textLight text-2xl font-medium text-left",
                        base: "w-full text-left"
                    }}
                    isRequired
                    labelPlacement={"outside"}
                    label="Subject"
                    type="text"
                    name="subject"
                    errorMessage={"Please enter a subject"}
                    placeholder={"Please write a subject"}
                />
                <Textarea
                    classNames={{
                        label: "!text-textLight text-2xl font-medium text-left",
                        base: "w-full text-left"
                    }}
                    isRequired
                    labelPlacement={"outside"}
                    label="Message"
                    minRows={5}
                    name="message"
                    errorMessage={"Please enter a message"}
                    placeholder={"Please write a message"}
                />
                <Button
                    type="submit"
                    color="primary"
                    isLoading={isSubmitting}
                    isDisabled={isSubmitting}
                >
                    Submit
                </Button>
                {statusMessage && (
                    <p className={"text-textLight text-center text-lg mt-2"}>{statusMessage}
                    </p>
                )}
            </Form>
        </div>
    )
}

