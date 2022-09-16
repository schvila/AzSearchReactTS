import axios from "axios";
import IRelationships from "./interfaces/IRelationships";

export default  async function GetRelationships() : Promise<IRelationships[]> {
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

