import axios from "axios";
import { json } from "stream/consumers";
import IRelationships from "./interfaces/IRelationships";

export  async function GetRelationships() : Promise<IRelationships[]> {
    const formName = 'relationshipGetForm'

      const formElement = window.document.getElementById(formName);
      if (!formElement) {
        console.error('Save failed. Form not found', formName);
        throw new Error(`Save failed. Form "${formName}" not found`);
      }
      const dcPageField: HTMLInputElement | undefined = formElement
      .getElementsByTagName('input')
      .namedItem('__Kentico_DC_Page') as HTMLInputElement;
      const formAction = formElement.getAttribute('action') as string;
      
      let response = await axios.post(formAction,
        { __Kentico_DC_Page: dcPageField.value },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log({relations: response.data.value});
        return response.data.value

}

export  async function AddRelations(): Promise<string> {
  const formName = 'relationshipAddForm'

    const formElement = window.document.getElementById(formName);
    if (!formElement) {
      console.error('Save failed. Form not found', formName);
      throw new Error(`Save failed. Form "${formName}" not found`);
    }
    const dcPageField: HTMLInputElement | undefined = formElement
    .getElementsByTagName('input')
    .namedItem('__Kentico_DC_Page') as HTMLInputElement;
    const formAction = formElement.getAttribute('action') as string;
    const data = {
      relationshipName: 'rel name',
      rightNodes: '1,2,5,6,9',
    }
    const sd = JSON.stringify(data);
    let response = await axios.put(formAction,
      {...data, __Kentico_DC_Page: dcPageField.value},
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log({response: response});
      return response.statusText;
}
