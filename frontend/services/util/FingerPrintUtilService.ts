class FingerPrintUtilService {
    static createFingerPrint = async (): Promise<string> => {
      const { ClientJS } = (await import('clientjs')).default;
      const clientJS = new ClientJS();

      return String(clientJS.getFingerprint());
    }
}

export default FingerPrintUtilService;
