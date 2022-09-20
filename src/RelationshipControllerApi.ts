import axios from "axios";
import { json } from "stream/consumers";
import { IJsonResult } from "./interfaces/IJsonResult";
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
        //console.log({relations: response.data.value});
        return response.data.value

}

export  async function AddRelations(relationshipName: string, rightNodes: string ): Promise<IJsonResult> {
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
      relationshipName: relationshipName,
      rightNodes: rightNodes,
    }
    let response = await axios.put(formAction,
      {...data, __Kentico_DC_Page: dcPageField.value},
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
}

export  async function DeleteRelations(leftNodeId: number, rightNodeId: number, relationshipNameId: number ): Promise<IJsonResult> {
  const formName = 'relationshipDeleteForm'

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
      leftNodeId: leftNodeId,
      rightNodeId: rightNodeId,
      relationshipNameId: relationshipNameId,
    }
    let response = await axios.put(formAction,
      {...data, __Kentico_DC_Page: dcPageField.value},
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
}
