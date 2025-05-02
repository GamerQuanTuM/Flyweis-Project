"use client";
import React, { useState, useTransition, useEffect } from "react";
import { Plus, Trash, Edit } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import { Button } from "@/components/ui/button";
import ArticleDialog from "./article-dialog";
import { getAllArticles } from "@/actions/articles/getAllArticles";
import { toast } from "sonner";
import { DataTable } from "@/components/DataTable";
// import { ColumnDef } from "@tanstack/react-table";
// import { Checkbox } from "@radix-ui/react-checkbox";
import { deleteArticle } from "@/actions/articles/deleteArticle";
import { getArticleColumns } from "@/constants/columns";

export interface SelectedArticle {
  _id: string;
  title: string;
  description: string;
  image: string;
}

const Articles = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<SelectedArticle | null>(null);

  // const columns: ColumnDef<Article>[] = [
  //   {
  //     id: "select",
  //     header: ({ table }) => (
  //       <Checkbox
  //         checked={
  //           table.getIsAllPageRowsSelected() ||
  //           (table.getIsSomePageRowsSelected() && "indeterminate")
  //         }
  //         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //         aria-label="Select all"
  //       />
  //     ),
  //     cell: ({ row }) => (
  //       <Checkbox
  //         checked={row.getIsSelected()}
  //         onCheckedChange={(value) => row.toggleSelected(!!value)}
  //         aria-label="Select row"
  //       />
  //     ),
  //     enableSorting: false,
  //     enableHiding: false,
  //   },
  //   {
  //     accessorKey: "_id",
  //     header: "ID",
  //     enableHiding: true,
  //     cell: ({ row }) => (
  //       <div className="capitalize">{row.getValue("_id")}</div>
  //     ),
  //     enableColumnFilter: false,
  //     meta: {
  //       hidden: true,
  //     },
  //   },
  //   {
  //     accessorKey: "image",
  //     header: "Image",
  //     cell: ({ row }) => (
  //       <img
  //         src={row.getValue("image")}
  //         alt="thumbnail"
  //         className="w-10 h-10 object-cover rounded-md border"
  //       />
  //     ),
  //   },
  //   {
  //     accessorKey: "title",
  //     header: "Title",
  //     cell: ({ row }) => (
  //       <div className="capitalize">{row.getValue("title")}</div>
  //     ),
  //   },
  //   {
  //     accessorKey: "description",
  //     header: "Description",
  //     cell: ({ row }) => (
  //       <div className="capitalize">{row.getValue("description")}</div>
  //     ),
  //   },
  //   {
  //     header: "Operations",
  //     accessorKey: "operations",
  //     cell: ({ row }) => {
  //       const rowId = row.getValue("_id") as string;
  //       const article = articles.find(article => article._id === rowId);

  //       return (
  //         <div className="flex gap-3 items-center">
  //           <Button
  //             onClick={() => {
  //               if (article) {
  //                 handleEdit(article);
  //               }
  //             }}
  //             variant="default"
  //             size="sm"
  //             className="flex gap-2 items-center bg-[#ccf0eb] hover:bg-[#ccf0eb] text-[#00B69B] rounded-lg cursor-pointer"
  //           >
  //             Edit
  //           </Button>

  //           <Button
  //             onClick={() => handleDelete(rowId)}
  //             variant="default"
  //             size="sm"
  //             className="flex gap-2 items-center bg-[#FED8E0] hover:bg-[#FED8E0] text-[#F80036] rounded-lg cursor-pointer"
  //           >
  //             Delete
  //           </Button>
  //         </div>
  //       );
  //     },
  //   },
  // ];

  useEffect(() => {
    fetchArticles();
  }, [page, limit]);

  const fetchArticles = () => {
    startTransition(async () => {
      try {
        const data = await getAllArticles(page, limit);
        setArticles(data);
      } catch (error) {
        toast.error("Failed to fetch articles");
      }
    });
  };

  const handleEdit = (article: Article) => {
    setSelectedArticle({
      _id: article._id,
      title: article.title,
      description: article.description,
      image: article.image,
    });
    setIsEditOpen(true);
  };

  const handleDelete = async (articleId: string) => {
    startTransition(async () => {
      try {
        await deleteArticle(articleId);
        toast.success("Article deleted successfully");
        fetchArticles();
      } catch (error) {
        toast.error("Failed to delete article");
      }
    });
  };

  const handleAddNew = () => {
    setSelectedArticle(null);
    setIsOpen(true);
  };

  const columns = getArticleColumns({
    articles,
    handleDelete,
    handleEdit
  });

  return (
    <>
      <PageWrapper percentageWidth="w-[90%]">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-black text-2xl font-semibold">Articles</h1>
          <div className="flex gap-3 items-center">
            <Button
              className="flex items-center gap-2 bg-[#199fb1] hover:bg-[#199fb1] cursor-pointer"
              onClick={handleAddNew}
            >
              <Plus className="h-4 w-4 text-white" />
              <p className="text-white text-sm">Add New Article</p>
            </Button>
          </div>
        </div>

        {isPending && <p className="text-gray-500 mt-4">Loading articles...</p>}

        {!isPending && <DataTable data={articles} columns={columns} />}
      </PageWrapper>

      <ArticleDialog 
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
      />
      
      <ArticleDialog
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        isEditMode
        selectedArticle={selectedArticle as SelectedArticle}
      />
    </>
  );
};

export default Articles;