export type CrumbsContent = {
  title: string,
  warning?: string,
  resumeRing: string,
  tableTab: string,
  schemaTab: string,
}

const crumbsContent: CrumbsContent = {
  title: 'Picker area',
  warning: 'The Breadcrumbs services and the picker panel shown on this page are currently under development. The tracking and payment info shown in this marketplace are not active, and are only shown for the purpose of showing future behavior and testing.',
  resumeRing: 'Crumb payments',
  tableTab: 'Table',
  schemaTab: 'Schema',
};

export default crumbsContent;
