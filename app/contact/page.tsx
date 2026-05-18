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
       <div className={"flex flex-col items-center"}>
           <div className={"text-3xl flex font-bold text-textPrimary text-center"}>
               <h1>Contact us</h1>
           </div>
                      
           <div className="w-full flex justify-center py-5 px-4">
             
               <Form className="w-full max-w-md bg-white font-bold font-mono flex items-center flex-col gap-5 border-3 border-backgroundAlt px-5 p-5"
                     onSubmit={onSubmit}>
                   <h1 className={"text-lg flex text-textPrimary text-center pb-2"}>Please fill out the following form and we will get back to you.</h1>
                   <Input
                       classNames={{
                           label: "!text-textPrimary text-2xl font-medium text-left",
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
                           label: "!text-textPrimary text-2xl font-medium text-left",
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
                           label: "!text-textPrimary text-2xl font-medium text-left",
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
                           label: "!text-textPrimary text-2xl font-medium text-left",
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
                       isLoading={isSubmitting}
                       isDisabled={isSubmitting}
                       className={"bg-secondary-button text-xl text-textLight"}
                   >
                       Submit
                   </Button>
                   {statusMessage && (
                       <p className={"text-textLight text-center text-lg mt-2"}>{statusMessage}
                       </p>
                   )}
               </Form>
           </div>
           
           <div>
               <h2 className={"text-center"}>Alternatively you can contact us via email:<a
                   href="mailto:contact@kiray.org"
                   className="underline hover:no-underline font-medium"
               >
                   contact@kiray.org
               </a></h2>
      
           </div>
       </div>
    )
}

