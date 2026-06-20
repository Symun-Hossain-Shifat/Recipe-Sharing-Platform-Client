"use client";

import { DeleteRecipe } from "@/lib/DeleteData/Recipe";
import {AlertDialog, Button} from "@heroui/react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";

export function DeleteRecipepage ({recipe}) { 
  const Handledelete = async (e) => {
  e.preventDefault();
  const result = await DeleteRecipe(recipe._id)
  if(result){
    toast.success('Recipe Delete Successfully')
    redirect('/')
  }
  }
  return (
    <AlertDialog>
      <Button isIconOnly size="sm" className= 'text-red-600' variant="tertiary">
                              <AiOutlineDelete />
        </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete Recipe permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>My Awesome Project</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onClick={Handledelete} slot="close" variant="danger">
                Delete Recipe
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}