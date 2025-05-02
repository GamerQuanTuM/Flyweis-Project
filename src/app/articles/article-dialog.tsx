"use client";

import React, { useState, ChangeEvent, useEffect, useActionState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createArticleAction } from "@/actions/articles/addArticle";
import { updateArticleAction } from "@/actions/articles/updateArticle";
import { SelectedArticle } from "./page";

interface ArticleDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isEditMode?: boolean;
  selectedArticle?: SelectedArticle;
}

interface ArticleFormData {
  title: string;
  description: string;
  image?: File | null;
}

interface ArticleFormState {
  success: boolean;
  message: string;
}

const ArticleDialog: React.FC<ArticleDialogProps> = ({
  isOpen,
  setIsOpen,
  isEditMode = false,
  selectedArticle,
}) => {
  const [formData, setFormData] = useState<ArticleFormData>({
    title: "",
    description: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();

  const actionFn = async (prevState: ArticleFormState, formData: FormData) => {
    if (isEditMode && selectedArticle) {
      return await updateArticleAction(prevState, formData, selectedArticle._id);
    } else {
      return await createArticleAction(prevState, formData);
    }
  };

  const [state, formAction, isPending] = useActionState<
    ArticleFormState,
    FormData
  >(actionFn, { success: false, message: "" });

  useEffect(() => {
    if (isOpen && isEditMode && selectedArticle) {
      setFormData({
        title: selectedArticle.title,
        description: selectedArticle.description,
        image: null,
      });
      setImagePreview(selectedArticle.image);
    }
  }, [isOpen, isEditMode, selectedArticle]);

  const resetForm = () => {
    setFormData({ title: "", description: "", image: null });
    setImagePreview(null);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDialogChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      resetForm();
    }
  };

  useEffect(() => {
    if (state.success) {
      setTimeout(() => {
        setIsOpen(false);
        router.refresh();
      }, 300);
    }
  }, [state.success, setIsOpen, router]);

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between w-full">
            {isEditMode ? "Edit Article" : "Add Article"}
          </DialogTitle>
        </DialogHeader>

        <form action={formAction}>
          <div className="flex flex-col items-center mt-4">
            <div
              className="w-16 h-16 bg-[#ECECEE] rounded-full flex items-center justify-center cursor-pointer mb-4"
              onClick={() => document.getElementById("imageUpload")?.click()}
            >
              {imagePreview ? (
                <Image
                  width={100}
                  height={100}
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <div className="text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="#000"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                    <circle cx="12" cy="13" r="4"></circle>
                  </svg>
                </div>
              )}
            </div>
            <Input
              id="imageUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              name="image"
            />
            <span className="text-blue-500 text-sm mb-4">Upload Image</span>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-sm font-medium flex">
                Title<span className="text-red-500 ml-0.5">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="Enter Article title"
                className="w-full p-2 border border-gray-200 rounded mt-1"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-sm font-medium flex">
                Description<span className="text-red-500 ml-0.5">*</span>
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter article description"
                className="w-full p-2 border border-gray-200 rounded mt-1 h-24"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#199fb1] hover:bg-[#199fb1] text-white py-2 rounded mt-4"
            disabled={isPending}
          >
            {isPending ? "Saving..." : isEditMode ? "Update" : "Save"}
          </Button>
        </form>

        {state.message && (
          <p
            className={`mt-2 text-sm ${
              state.success ? "text-green-600" : "text-red-600"
            }`}
          >
            {state.message}
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ArticleDialog;
