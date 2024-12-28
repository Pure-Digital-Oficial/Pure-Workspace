import { CrudType, ProductResponseDto } from '@pure-workspace/domain';
import { FC } from 'react';
import { CreateProductModal } from './create-product-modal';
import { DeleteProductModal } from './delete-product-modal';
import { EditProductModal } from './edit-product-modal';
import { DetailsProductModal } from './details-product-modal';
import { ChangeProductStatusModal } from './change-product-status-modal';

interface ProductmodalsProps {
  selectedId: string;
  openModal: {
    create: boolean;
    delete: boolean;
    edit: boolean;
    details: boolean;
    change: boolean;
  };
  handlePopUpClose: (type: CrudType) => void;
  showAlert: (message: string, success: boolean) => void;
  createProductTitle?: string;
  deleteProductTitle?: string;
  deleteProductSubTitle?: string;
  editProductTitle?: string;
  detailsProductTitle?: string;
  changeProductTitle?: string;
  product?: ProductResponseDto;
}

export const ProductModals: FC<ProductmodalsProps> = ({
  selectedId,
  openModal,
  handlePopUpClose,
  showAlert,
  product,
  createProductTitle = 'Cadastrar Produto',
  editProductTitle = 'Editar Produto',
  deleteProductTitle = 'Deletar Produto',
  detailsProductTitle = 'Detalhes do Produto',
  changeProductTitle = 'Alterar Status do Produto',
  deleteProductSubTitle = 'Tem certeza que desejar deletar este produto ?',
}) => {
  return (
    <>
      <CreateProductModal
        open={openModal.create}
        title={createProductTitle}
        handlePopUpClose={() => handlePopUpClose('create')}
        showAlert={showAlert}
      />

      <DeleteProductModal
        open={openModal.delete}
        idToDelete={selectedId}
        title={deleteProductTitle}
        subTitle={deleteProductSubTitle}
        handlePopUpClose={() => handlePopUpClose('delete')}
        showAlert={showAlert}
      />

      <EditProductModal
        open={openModal.edit}
        product={product ?? ({} as ProductResponseDto)}
        idToEdit={selectedId}
        title={editProductTitle}
        handlePopUpClose={() => handlePopUpClose('edit')}
        showAlert={showAlert}
      />

      <DetailsProductModal
        open={openModal.details}
        product={product ?? ({} as ProductResponseDto)}
        title={detailsProductTitle}
        handlePopUpClose={() => handlePopUpClose('details')}
      />

      <ChangeProductStatusModal
        open={openModal.change}
        idToChange={selectedId}
        showAlert={showAlert}
        status={product?.status ?? ''}
        title={changeProductTitle}
        handlePopUpClose={() => handlePopUpClose('change')}
      />
    </>
  );
};
