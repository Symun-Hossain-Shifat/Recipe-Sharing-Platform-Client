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
      <Button isIconOnly size="sm" className="text-rose-500 hover:text-rose-400 hover:bg-zinc-800" variant="tertiary">
        <AiOutlineDelete size={18} />
      </Button>
      <AlertDialog.Backdrop className="bg-black/80 backdrop-blur-sm">
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px] bg-zinc-900 border border-zinc-800 text-white rounded-3xl p-6">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading className="text-white font-bold">Delete Recipe permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body className="text-zinc-400 text-sm">
              <p>
                This will permanently delete <strong className="text-white">{recipe?.recipeName || 'this recipe'}</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer className="pt-4 flex gap-2">
              <Button slot="close" variant="tertiary" className="text-zinc-300 bg-zinc-800 hover:bg-zinc-700">
                Cancel
              </Button>
              <Button onClick={Handledelete} slot="close" variant="danger" className="bg-rose-600 hover:bg-rose-500 text-white">
                Delete Recipe
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}