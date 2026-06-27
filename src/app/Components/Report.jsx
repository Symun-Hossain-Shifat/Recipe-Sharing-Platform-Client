"use client";

import { authClient } from "@/lib/auth-client";

import { PostReport } from "@/lib/PostData/report";

import {Button,  Modal, Surface} from "@heroui/react";
import { Flag } from "lucide-react";

import toast from "react-hot-toast";
import { MdReport } from "react-icons/md";

export function ReportPage ({recipe}) {
  const { data: session } = authClient.useSession();
  const user = session?.user;
 const Handlereport = async (e) => {
  
  
 e.preventDefault()

  if ( user?.email === recipe.authorEmail) {
    toast.error(
      "You cannot report your own recipe! Please select another recipe."
    );
    return;
  }
 const Formdata = e.target 
 const Data = {
  reason : Formdata.message.value ,
  recipeId : recipe._id ,
  reporterEmail : user?.email ,
   status : recipe.status
  } 
  const result = await PostReport(Data)  
  // console.log(result)
   if(result){
          toast.success('Report Submited Successfully 🎉')
         
        }
 }
  return (
    <Modal>
      <Button className="flex items-center gap-2 px-4 py-6 bg-white shadow rounded-xl text-red-500">
          <Flag />
          Report
        </Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <MdReport className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Share Your Review</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-muted">
                If you find any issue, inappropriate content, or violation, please let us know. Our team will review your report as soon as possible.
              </p>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form onSubmit={Handlereport} className="flex flex-col gap-4">
                  <textarea
                  name="message" required
                placeholder="Describe the issue in detail..."
                rows={8}
                className="w-full border rounded-xl p-3"
            />
               <Modal.Footer>
              <Button slot="close" variant="secondary">
                Cancel
              </Button>
              <Button  type="submit" slot= 'close' >Send Review</Button>
            </Modal.Footer>
                </form>
              </Surface>
            </Modal.Body>
            
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}