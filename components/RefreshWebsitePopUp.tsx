"use client";
import React, {useEffect, useState} from "react";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@heroui/modal";
import {Button} from "@heroui/button";

const POP_UP_STORAGE_KEY = "kiray-putjung-refresh-popup-acknowledged";

const RefreshWebsitePopUp = () => {

    const [wasShown, setWasShown] = useState(true);
    
    useEffect(() => {
        const hasAcknowledged = localStorage.getItem(POP_UP_STORAGE_KEY);
        
        if (hasAcknowledged !== "true"){
            setWasShown(false);
        }
    }, []);
    
    const handleAcknowledgment = () => {
        localStorage.setItem(POP_UP_STORAGE_KEY, "true");
        setWasShown(true);
    }

    return (
        <>
            <Modal 
                className={"text-center bg-background text-textPrimary"}
                isOpen={!wasShown}
                isDismissable={false}
                hideCloseButton={true}
            >
                <ModalContent>
                    <ModalHeader className="text-xl flex flex-col gap-1">Our website is currently being refreshed</ModalHeader>
                    <ModalBody>
                        <p className=" leading-relaxed max-w-2xl mx-auto">
                            We are updating our website to better reflect our community, culture,
                            and the work we do.
                        </p>
                        <p>We appreciate your patience while we make these improvements.</p>
                    </ModalBody>
                    <ModalFooter className={"justify-center"}>
                        <Button className={"bg-primary"} onPress={() => handleAcknowledgment()}>Ok</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default RefreshWebsitePopUp;