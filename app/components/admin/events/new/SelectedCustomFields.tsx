import type { FC } from 'react';
import { SubBox } from '~/components/elementary/SubBox';
import type { CustomField } from '~/routes/admin/events/new';

export const labelOfFieldIds = {
  text: 'Textfeld',
  number: 'Zahlenfeld',
  select: 'Auswahlfeld',
  checkbox: 'Checkbox'
}

export const SelectedCustomFields:FC<{customFields:CustomField[], removeField:(fieldId: string) => any, moveField:(fieldId:string, direction: -1|1) => any}> = ({customFields, removeField, moveField}) => {
  return (
    <div className='mt-3 space-y-5'>
      <input type='hidden' name='selected-custom-fields' value={JSON.stringify(customFields.map((cF) => cF.id))} />
      {customFields.map(field => (
        <SubBox key={field.id}>
          <div className='flex'>
            <div className='pr-3'>
              <div><button type='button' onClick={() => moveField(field.id, -1)}  >+</button></div>
              <div className='flex justify-center'><button type='button' onClick={() => moveField(field.id, 1)} > - </button></div>
            </div>
            <div className='flex-grow'>
              <div className='flex justify-between'>
                <div><b>{field.name}</b></div>
                <button
                  type='button'
                  className='text-blue-300'
                  onClick={() => removeField(field.id)}
                >
                  Entfernen
                </button>
              </div>
              <div className='flex justify-between'>
                {/* @ts-ignore*/}
                <div>{labelOfFieldIds[field.typeId]}</div>
                <div>{field.adminOnly ? (<span className=' text-amber-200'>Nur für Admins - Wird nicht bei der Anmeldung abgefragt.</span>) : ((field.typeId === 'text' || field.typeId === 'number') && (field.required ? 'Pflichtfeld' : 'Optional'))}</div>
                {field.typeId === 'select' && (
                  <>
                  <div className='ml-5'>
                    <div><b>Optionen:</b></div>
                    <div className='pl-6'>
                      {field.options.map(option => (
                        <div key={option.id}>{option.name}</div>
                      ))}
                    </div>
                  </div>
                  <div className=' flex-grow'></div>
                  </>
                )}
              </div>
            </div>
          </div>
      </SubBox>
      ))}
    </div>
  )
}
