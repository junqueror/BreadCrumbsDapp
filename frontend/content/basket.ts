export type BsaketContent = {
  title: string,
  warning: string,
  deleteButton: string,
  editButton: string,
  cancelButton: string,
  tableTab: string,
  schemaTab: string,
}

const basket: BsaketContent = {
  title: 'Basket',
  warning: 'The Breadcrumbs services and the basket (campaign) shown on this page are currently under development. The data shown does not match to actual transactions, and are only shown for the purpose of showing future behavior and testing.',
  deleteButton: 'Delete',
  editButton: 'Edit',
  cancelButton: 'Cancel',
  tableTab: 'Table',
  schemaTab: 'Schema',
};

export default basket;
