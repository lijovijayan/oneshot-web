import React, { useEffect, useState } from 'react'
import { Input, Form } from 'antd'
import {
    CountrySelect,
    StateSelect,
    CitySelect,
    CourceSelect
} from '../../../components'
import {} from 'antd/lib/form/Form'
import { ICollegeFilterForm } from '../../../types'
import { COLLEGE_FILTER_FORM_CONTROL } from '../../../constants'

const { Search } = Input

interface Props {
    onChange: (filter: ICollegeFilterForm) => void
}

const { useForm, Item } = Form
function Filters({ onChange }: Props) {
    const disableAutoComplete = () => {
        setTimeout(() => {
            document.querySelectorAll('input').forEach((e) => {
                e.setAttribute('autocomplete', 'oneshot-prevent-autocomplete')
            })
        }, 1000)
    }
    useEffect(() => {
        disableAutoComplete()
    }, [])
    const [form] = useForm<ICollegeFilterForm>()
    const [formData, setFormData] = useState<ICollegeFilterForm>({
        [COLLEGE_FILTER_FORM_CONTROL.SEARCH_KEY]: '',
        [COLLEGE_FILTER_FORM_CONTROL.COUNTRY]: 0,
        [COLLEGE_FILTER_FORM_CONTROL.STATE]: 0,
        [COLLEGE_FILTER_FORM_CONTROL.CITY]: 0,
        [COLLEGE_FILTER_FORM_CONTROL.COURCE]: 0
    })
    function onSearch(searchKey: string) {
        console.log(searchKey)
    }
    function onValuesChange(
        value: Partial<ICollegeFilterForm>,
        values: ICollegeFilterForm
    ) {
        if (value.hasOwnProperty(COLLEGE_FILTER_FORM_CONTROL.COUNTRY)) {
            values[COLLEGE_FILTER_FORM_CONTROL.CITY] = undefined
            values[COLLEGE_FILTER_FORM_CONTROL.STATE] = undefined
            form.setFieldsValue(values)
        } else if (value.hasOwnProperty(COLLEGE_FILTER_FORM_CONTROL.STATE)) {
            values[COLLEGE_FILTER_FORM_CONTROL.CITY] = undefined
            form.setFieldsValue(values)
        }
        onChange(values)
        setFormData({ ...formData, ...values })
    }
    return (
        <Form
            form={form}
            className="filter-container"
            onValuesChange={onValuesChange}
            autoComplete="off"
            autoCorrect="off"
        >
            <Item name={[COLLEGE_FILTER_FORM_CONTROL.SEARCH_KEY]}>
                <Search
                    placeholder="student name"
                    onSearch={onSearch}
                    allowClear
                />
            </Item>
            <Item name={[COLLEGE_FILTER_FORM_CONTROL.COUNTRY]}>
                <CountrySelect />
            </Item>
            <Item name={[COLLEGE_FILTER_FORM_CONTROL.STATE]}>
                <StateSelect
                    filter={{
                        country_id:
                            formData[COLLEGE_FILTER_FORM_CONTROL.COUNTRY] ||
                            undefined
                    }}
                />
            </Item>
            <Item name={[COLLEGE_FILTER_FORM_CONTROL.CITY]}>
                <CitySelect
                    filter={{
                        country_id:
                            formData[COLLEGE_FILTER_FORM_CONTROL.COUNTRY] ||
                            undefined,
                        state_id:
                            formData[COLLEGE_FILTER_FORM_CONTROL.STATE] ||
                            undefined
                    }}
                />
            </Item>
            <Item name={[COLLEGE_FILTER_FORM_CONTROL.COURCE]}>
                <CourceSelect />
            </Item>
        </Form>
    )
}

export default Filters
