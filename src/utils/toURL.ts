export default function (file: File) {
  return new Promise<string>((res, rej) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result?.toString() || '';
      if (url) {
        res(url);
      } else {
        rej();
      }
    };
    reader.onerror = (e) => {
      rej();
    };
    reader.readAsDataURL(file);
  });
}
