"use client";

import { EditRecipeInfo } from "@/lib/EditData/editRecipe";
import {Button, Card, CardFooter, CardHeader, Input, Label, ListBox, Modal, Select } from "@heroui/react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

export function RecipeEditPage ({recipe , User}) {
    // console.log(recipe)

    const uploadImageToImgBB = async (imageFile) => {
        const formData = new FormData();
    
        formData.append("image", imageFile);
    
        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
          {
            method: "POST",
            body: formData,
          }
        );
    
        const data = await response.json();
    
        if (!data.success) {
          throw new Error("Image upload failed");
        }
    
        return data.data.display_url;
      };
    
    
    
    
    
      const handleeditRecipe = async (e) => {
        e.preventDefault();
    
      
          const form = e.target;
    
          const imageFile = form.recipeimage.files[0];
    
          if (!imageFile) {
            alert("Please select an image");
            return;
          }
    
          const imageUrl = await uploadImageToImgBB(imageFile);
        //   console.log(imageUrl)
          const NewData = {
            
              authorName: User?.name,
            
             authorEmail : User?.email,
            
              authorId: User?.id,
    
            recipeName: form.recipename.value,
            recipeImage: imageUrl,
    
            category : form.category.value || recipe.category ,
            cuisineType: form.type.value,
            difficultyLevel: form.difficulty.value || recipe.difficultyLevel,
            preparationTime: form.preparation.value,
            ingredients: form.ingrediants.value,
            instructions: form.steps.value,
             likesCount : 0 ,
            isFeatured: form.featured.value || recipe.isFeatured,
            status : form.status.value || recipe.status
          };
          const id = recipe._id
          // console.log(NewData);
    
          const result = await EditRecipeInfo(NewData , id )
          
          if(result){
            toast.success('Recipe Published Successfully 🎉')
            redirect('/Dashboard/User')
          }
          console.log(result);
    
      };
    


  return (
    <Modal>
      <Button isIconOnly size="sm" variant="tertiary">
                          <FaEdit size={30} />  
                          </Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog  className="w-[95vw] max-w-5xl max-h-[90vh] overflow-y-auto">
            <span className="text-red-600 m-5">
          <Modal.CloseTrigger />
            </span>
          
             <form className=" w-full " onSubmit={handleeditRecipe} >
             <Card className="
                w-full
                shadow-2xl
                rounded-2xl
                border
                border-gray-100
                p-4
                md:p-8
                space-y-6
            ">
       
               {/* HEADER */}
               <CardHeader className="flex flex-col text-center space-y-2 p-0">
                 <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                   🍽️ Edit Your Recipe
                 </h1>
                 <p className="text-gray-500 text-sm">
                   Customized your delicious recipe with the world
                 </p>
               </CardHeader>
       
               <div className="space-y-8 p-0">
       
                 {/* GRID 1 */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
       
                   <Input label="Recipe Name"  type="text" name="recipename" defaultValue={recipe.recipeName} />
       
                   {/* CATEGORY */}
                   <Select className="w-full"   name="category" placeholder={recipe.category}>
                     <Label>Category</Label>
                     <Select.Trigger>
                       <Select.Value />
                       <Select.Indicator />
                     </Select.Trigger>
                     <Select.Popover>
                       <ListBox>
                         <ListBox.Item id="breakfast">Breakfast</ListBox.Item>
                         <ListBox.Item id="lunch">Lunch</ListBox.Item>
                         <ListBox.Item id="dinner">Dinner</ListBox.Item>
                         <ListBox.Item id="snack">Snack</ListBox.Item>
                       </ListBox>
                     </Select.Popover>
                   </Select>
       
                   <Input label="Cuisine Type" defaultValue={recipe.cuisineType}  name="type" placeholder="e.g. Chinese, Indian" />
       
                   {/* DIFFICULTY */}
                   <Select className="w-full"  name="difficulty" placeholder={recipe.difficultyLevel}>
                     <Label>Difficulty Level</Label>
                     <Select.Trigger>
                       <Select.Value />
                       <Select.Indicator />
                     </Select.Trigger>
                     <Select.Popover>
                       <ListBox>
                         <ListBox.Item id="easy">Easy</ListBox.Item>
                         <ListBox.Item id="medium">Medium</ListBox.Item>
                         <ListBox.Item id="hard">Hard</ListBox.Item>
                       </ListBox>
                     </Select.Popover>
                   </Select>
       
                   <Input
                     label="Preparation Time (minutes)" 
                     defaultValue={recipe.preparationTime}
                     name="preparation"
                     placeholder="e.g. 30"
                     type="number"
                   />
                 </div>
       
               <div>
                   <label className="block mb-2 font-medium">
                       Ingredients
                   </label>
       
                   <textarea
                   name="ingrediants" 
                       placeholder="e.g. Rice, Vegetables, Soy sauce..."
                       defaultValue={recipe.ingredients}
                       rows={4}
                       className="w-full border rounded-xl p-3"
                   />
                   </div>
       
                   <div>
                   <label className="block mb-2 font-medium">
                       Cooking Instructions
                   </label>
       
                   <textarea
                   name="steps" 
                       placeholder="Write step by step cooking guide..."
                       rows={6}
                       defaultValue={recipe.instructions}
                       className="w-full border rounded-xl p-3"
                   />
                   </div>
                  <div className="space-y-3">
                        <img
                            src={recipe.recipeImage}
                            alt={recipe.recipeName}
                            className="w-32 h-32 object-cover rounded-lg"
                        />

                        <Input
                            label="Change Recipe Image (Optional)"
                            type="file"
                            name="recipeimage"
                            accept="image/*"
                        />
                        </div>
       
                 {/* GRID 2 */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
       
                  
       
                   {/* FEATURED */}
                   <Select name="featured"  className="w-full" placeholder={recipe.isFeatured}>
                     <Label>Featured Recipe</Label>
                     <Select.Trigger>
                       <Select.Value />
                       <Select.Indicator />
                     </Select.Trigger>
                     <Select.Popover>
                       <ListBox>
                         <ListBox.Item id="true">Yes</ListBox.Item>
                         <ListBox.Item id="false">No</ListBox.Item>
                       </ListBox>
                     </Select.Popover>
                   </Select>
       
                   {/* STATUS */}
                   <Select name="status"  className="w-full" placeholder={recipe.status}>
                     <Label>Status</Label>
                     <Select.Trigger>
                       <Select.Value />
                       <Select.Indicator />
                     </Select.Trigger>
                     <Select.Popover>
                       <ListBox>
                         <ListBox.Item id="published">Published</ListBox.Item>
                         <ListBox.Item id="draft">Draft</ListBox.Item>
                       </ListBox>
                     </Select.Popover>
                   </Select>
                 </div>
       
               </div>
       
               {/* BUTTONS */}
               <CardFooter  className="flex flex-col md:flex-row gap-4 pt-4 p-0">
       
                 <Button type="submit"  className="
                    w-full
                  
                    flex items-center justify-center
                    md:w-auto
                    md:min-w-[220px]
                    bg-gradient-to-r
                    from-orange-500
                    to-emerald-500
                    text-white
                ">
                    <FiEdit size={30} />
                   Edit Recipe
                 </Button>
       
               
               </CardFooter>
       
             </Card>
            </form>
          </Modal.Dialog>
        </Modal.Container>
            
      </Modal.Backdrop>
    </Modal>
  );
}

