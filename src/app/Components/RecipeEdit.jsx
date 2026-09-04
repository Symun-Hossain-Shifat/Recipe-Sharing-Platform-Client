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
            redirect(`/Dashboard/${User?.role}`)
          }
          console.log(result);
    
      };
    


  return (
    <Modal>
      <Button isIconOnly size="sm" variant="tertiary" className="text-zinc-300 hover:text-white hover:bg-zinc-800">
        <FaEdit size={18} />  
      </Button>
      <Modal.Backdrop className="bg-black/80 backdrop-blur-sm">
        <Modal.Container placement="auto">
          <Modal.Dialog className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto bg-zinc-900 border border-zinc-800 rounded-3xl p-2">
            <span className="text-red-400 m-3 inline-block">
              <Modal.CloseTrigger />
            </span>
          
            <form className="w-full" onSubmit={handleeditRecipe}>
              <Card className="w-full bg-zinc-900 text-white border-0 p-4 md:p-8 space-y-6">
       
                {/* HEADER */}
                <CardHeader className="flex flex-col text-center space-y-2 p-0">
                  <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                    🍽️ Edit Your Recipe
                  </h1>
                  <p className="text-zinc-400 text-sm">
                    Customize your recipe details and cooking steps
                  </p>
                </CardHeader>
        
                <div className="space-y-8 p-0">
        
                  {/* GRID 1 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
                    <Input label="Recipe Name" type="text" name="recipename" defaultValue={recipe.recipeName} />
        
                    {/* CATEGORY */}
                    <Select className="w-full" name="category" placeholder={recipe.category}>
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
        
                    <Input label="Cuisine Type" defaultValue={recipe.cuisineType} name="type" placeholder="e.g. Chinese, Indian" />
        
                    {/* DIFFICULTY */}
                    <Select className="w-full" name="difficulty" placeholder={recipe.difficultyLevel}>
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
                    <label className="block mb-2 font-medium text-xs uppercase tracking-wider text-zinc-300">
                      Ingredients
                    </label>
        
                    <textarea
                      name="ingrediants" 
                      placeholder="e.g. Rice, Vegetables, Soy sauce..."
                      defaultValue={recipe.ingredients}
                      rows={4}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 text-white placeholder:text-zinc-600 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm transition-colors"
                    />
                  </div>
        
                  <div>
                    <label className="block mb-2 font-medium text-xs uppercase tracking-wider text-zinc-300">
                      Cooking Instructions
                    </label>
        
                    <textarea
                      name="steps" 
                      placeholder="Write step-by-step cooking guide..."
                      rows={6}
                      defaultValue={recipe.instructions}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 text-white placeholder:text-zinc-600 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm transition-colors"
                    />
                  </div>

                  <div className="space-y-3 p-4 bg-zinc-950 rounded-2xl border border-zinc-800">
                    <p className="text-xs uppercase tracking-wider font-semibold text-zinc-400">Current Image</p>
                    <img
                      src={recipe.recipeImage}
                      alt={recipe.recipeName}
                      className="w-32 h-32 object-cover rounded-xl border border-zinc-800"
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
                    <Select name="featured" className="w-full" placeholder={recipe.isFeatured ? "Yes" : "No"}>
                      <Label>Featured Recipe</Label>
                      <Select.Trigger>
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>
                      <Select.Popover>
                        <ListBox>
                          <ListBox.Item id="false">No</ListBox.Item>
                        </ListBox>
                      </Select.Popover>
                    </Select>
        
                    {/* STATUS */}
                    <Select name="status" className="w-full" placeholder={recipe.status}>
                      <Label>Status</Label>
                      <Select.Trigger>
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>
                      <Select.Popover>
                        <ListBox>
                          <ListBox.Item id="published">Published</ListBox.Item>
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </div>
        
                </div>
        
                {/* BUTTONS */}
                <CardFooter className="flex flex-col md:flex-row gap-4 pt-4 p-0">
                  <Button type="submit" className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3.5 rounded-xl shadow-lg transition-colors">
                    <FiEdit size={18} />
                    <span>Save Changes</span>
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
