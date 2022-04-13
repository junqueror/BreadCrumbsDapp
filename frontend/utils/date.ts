const bigNumberToDate = (date: number) => new Date(Number(date * 1000));

const formatDate = (date: Date | undefined = undefined) => (date !== undefined && date!== null)
 ? date.toLocaleDateString('es-ES', { hour: 'numeric', minute: 'numeric' })
: ' - '
;

export {
  bigNumberToDate,
  formatDate,
};
