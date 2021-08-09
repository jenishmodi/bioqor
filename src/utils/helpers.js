import { Parser } from 'json2csv';

export const objectToFormData = (data) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value) && value[0] instanceof File) {
      value.forEach((v) => formData.append(key, v));
    } else {
      formData.append(key, value);
    }
  });
  return formData;
};

export const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () =>
      resolve({ name: file.name, dataURL: fileReader.result });
    fileReader.onerror = (error) => reject(error);
  });

export const filesToBase64 = (files) => Promise.all(files.map(fileToBase64));

export const isObjectEmpty = (obj) => Object.keys(obj).length === 0;

export const generateCsvFileUrl = (data, fieldsToExclude = []) => {
  const fields = Object.keys(data[0]).filter(
    (field) => !fieldsToExclude.includes(field)
  );
  const json2csvParser = new Parser({ fields });
  const csvData = json2csvParser.parse(data);

  const blob = new Blob([csvData]);
  return URL.createObjectURL(blob);
};
