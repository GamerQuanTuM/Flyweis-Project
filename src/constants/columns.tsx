import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

type ArticleProps = {
  articles: Article[];
  handleDelete: (id: string) => void;
  handleEdit: (article: Article) => void;
};

export const getArticleColumns = ({
  articles,
  handleDelete,
  handleEdit,
}: ArticleProps): ColumnDef<Article>[] => {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "_id",
      header: "ID",
      enableHiding: true,
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("_id")}</div>
      ),
      enableColumnFilter: false,
      meta: {
        hidden: true,
      },
    },
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => (
        <img
          src={row.getValue("image")}
          alt="thumbnail"
          className="w-10 h-10 object-cover rounded-md border"
        />
      ),
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("description")}</div>
      ),
    },
    {
      header: "Operations",
      accessorKey: "operations",
      cell: ({ row }) => {
        const rowId = row.getValue("_id") as string;
        const article = articles.find((article) => article._id === rowId);

        return (
          <div className="flex gap-3 items-center">
            <Button
              onClick={() => {
                if (article) {
                  handleEdit(article);
                }
              }}
              variant="default"
              size="sm"
              className="flex gap-2 items-center bg-[#ccf0eb] hover:bg-[#ccf0eb] text-[#00B69B] rounded-lg cursor-pointer"
            >
              Edit
            </Button>

            <Button
              onClick={() => handleDelete(rowId)}
              variant="default"
              size="sm"
              className="flex gap-2 items-center bg-[#FED8E0] hover:bg-[#FED8E0] text-[#F80036] rounded-lg cursor-pointer"
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];
};
