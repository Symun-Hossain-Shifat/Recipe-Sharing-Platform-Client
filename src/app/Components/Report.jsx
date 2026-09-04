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
     if(user?.role === 'Admin'){
         toast.error("Admin Cannot post Report !");
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
      <Button className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 shadow rounded-xl text-rose-400 text-sm font-semibold transition-colors">
        <Flag size={16} />
        <span>Report</span>
      </Button>
      <Modal.Backdrop className="bg-black/80 backdrop-blur-sm">
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md bg-zinc-900 border border-zinc-800 text-white rounded-3xl p-6">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-rose-950 text-rose-400 border border-rose-800/60 p-2 rounded-xl">
                <MdReport className="size-5" />
              </Modal.Icon>
              <Modal.Heading className="text-white font-bold text-lg mt-2">Report Recipe Issue</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-zinc-400">
                If you find any issue, inappropriate content, or violation, please let us know. Our team will review your report as soon as possible.
              </p>
            </Modal.Header>
            <Modal.Body className="p-0 mt-4">
              <Surface variant="default" className="bg-transparent border-0 p-0">
                <form onSubmit={Handlereport} className="flex flex-col gap-4">
                  <textarea
                    name="message" required
                    placeholder="Describe the issue in detail..."
                    rows={6}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 text-white placeholder:text-zinc-600 outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 text-sm transition-colors"
                  />
                  <Modal.Footer className="flex gap-2 justify-end pt-2">
                    <Button slot="close" variant="secondary" className="bg-zinc-800 text-zinc-300 hover:bg-zinc-700">
                      Cancel
                    </Button>
                    <Button type="submit" slot="close" className="bg-rose-600 hover:bg-rose-500 text-white font-medium">
                      Send Report
                    </Button>
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