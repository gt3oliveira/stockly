"use client";

import { deleteProduct } from "@/actions/product/delete-product";
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "../../../components/ui/alert-dialog";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";

interface DeleteDialogContentProps {
  productId: string;
}

export const DeleteDialogContent = ({
  productId,
}: DeleteDialogContentProps) => {
  const { execute: executeDeleteProduct } = useAction(deleteProduct, {
    onSuccess: () => {
      toast.success("Produto deletado com sucesso!");
    },
    onError: () => {
      toast.error("Ocorreu um erro ao deletar o produto.");
    },
  });

  function handleContinueClick() {
    executeDeleteProduct({ id: productId });
  }

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
        <AlertDialogDescription>
          Essa ação irá deletar permanentemente este produto. Esta ação não pode
          ser desfeita.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction onClick={handleContinueClick}>
          Continuar
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};
