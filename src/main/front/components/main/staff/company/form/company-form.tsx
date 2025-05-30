"use client";
import Image from "next/image";
import asideArrow from '@/public/assets/aside-arrow.gif';
import '@/styles/form-style/form.scss'
import {startTransition, useActionState, useEffect, useMemo, useRef} from "react";
import {useRouter} from "next/navigation";
import ErrorBox from "@/components/share/error/error-box";
import {ResponseCompany} from "@/model/types/staff/company/type";
import {submitCompanyInfo} from "@/features/staff/company/action/company-action";
import useChangeMode from "@/hooks/share/useChangeMode";

export default function CompanyForm({company,isMobile=false,mode}: { company?: ResponseCompany, isMobile?:boolean, mode:'write'|'detail'|'edit' }) {

    const initialState = useMemo(() => company ?? {}, [company]);
    const [state, action, isPending] = useActionState(submitCompanyInfo, initialState);
    const formRef = useRef(null)
    const router = useRouter();
    const changeModeHandler = useChangeMode()

    const submitHandler = () => {
        const formData = new FormData(formRef.current);
        formData.set('action', mode);
        startTransition(() => {
            action(formData);
        });
    }

    useEffect(() => {
        if (!state.status) return
        if (state.status === 200) {
            if(mode==='edit') {
                window.alert('수정이 완료되었습니다.')
                isMobile ? window.history.back() : router.push(`company?mode=detail&target=${company.companyId}`)
            }else if(mode==='write'){
                window.alert('회사를 등록했습니다.')
                isMobile ? window.history.back() : window.close();
            }
        }else{
            window.alert('문제가 발생했습니다. 잠시 후 다시 시도해주세요')
        }
    }, [state])

    return (
        <section className={`register-form-container ${mode==='detail' ? 'view-mode': ''}`}>
            <header className="register-header">
                <Image src={asideArrow} alt=">" width={15}/>
                <h4>
                    {mode === 'detail' && '회사정보 상세보기'}
                    {mode === 'edit' && '회사정보 수정하기'}
                    {mode === 'write' && '회사정보 등록하기'}
                </h4>
            </header>
            <form action={action} ref={formRef}>
                <table className="register-form-table" key={state.companyId}>
                    <colgroup>
                        <col style={{width: '15%'}}/>
                        <col style={{width: '35%'}}/>
                        <col style={{width: '15%'}}/>
                        <col style={{width: '35%'}}/>
                    </colgroup>
                    <tbody>
                    <tr>
                        <td className="table-label">상호명</td>
                        <td>
                            <input type="text" name="companyName" defaultValue={state.companyName}/>
                            {state.formErrors?.companyName &&
                                <ErrorBox key={state.formErrors.errorKey}>
                                    {state.formErrors.companyName}
                                </ErrorBox>
                            }
                        </td>
                        <td className="table-label">인쇄명</td>
                        <td>
                            <input type="text" name="printName" defaultValue={state.printName}/>
                            {state.formErrors?.printName &&
                                <ErrorBox key={state.formErrors.errorKey}>
                                    {state.formErrors.printName}
                                </ErrorBox>
                            }
                        </td>
                    </tr>
                    <tr>
                        <td className="table-label">대표자</td>
                        <td>
                            <input type="text" name="ceo" defaultValue={state.ceo}/>
                            {state.formErrors?.ceo &&
                                <ErrorBox key={state.formErrors.errorKey}>
                                    {state.formErrors.ceo}
                                </ErrorBox>
                            }
                        </td>
                        <td className="table-label">주민등록번호</td>
                        <td><input type="text" name="ceoCert" defaultValue={state.ceoCert}/></td>
                    </tr>
                    <tr>
                        <td className="table-label">사업자등록번호</td>
                        <td>
                            <input type="text" name="businessNumber" defaultValue={state.businessNumber}/>
                            {state.formErrors?.businessNumber &&
                                <ErrorBox key={state.formErrors.errorKey}>
                                    {state.formErrors.businessNumber}
                                </ErrorBox>
                            }
                        </td>
                        <td className="table-label">전화</td>
                        <td><input type="text" name="tel" defaultValue={state.tel}/></td>
                    </tr>
                    <tr>
                        <td className="table-label">전화2</td>
                        <td><input type="text" name="tel2" defaultValue={state.tel2}/></td>
                        <td className="table-label">FAX</td>
                        <td><input type="text" name="fax" defaultValue={state.fax}/></td>
                    </tr>
                    <tr>
                        <td className="table-label">업태</td>
                        <td><input type="text" name="businessStatus" defaultValue={state.businessStatus}/></td>
                        <td className="table-label">종목</td>
                        <td><input type="text" name="businessKind" defaultValue={state.businessKind}/></td>
                    </tr>
                    <tr>
                        <td rowSpan={3} className="table-label">주소</td>
                        <td colSpan={3}>
                        <input name="zipcode" defaultValue={state.zipcode} className="zip-code-input" readOnly={mode==='detail'}/>[우편번호]
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <input type='text' name='address' defaultValue={state.address}/>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <input type='text' name='addressDetail' defaultValue={state.addressDetail}/>
                        </td>
                    </tr>
                    <tr>
                        <td className="table-label">메모</td>
                        <td colSpan={3}><textarea/></td>
                    </tr>
                    <tr>
                        <td className="table-label">견적서파일명</td>
                        <td colSpan={3}><input type='text' name='estimate' defaultValue={state.estimate}/></td>
                    </tr>
                    <tr>
                        <td className="table-label">도장파일명</td>
                        <td colSpan={3}><input type='text' name='stamp' defaultValue={state.stamp}/></td>
                    </tr>
                    </tbody>
                </table>
                <div className='button-container' style={{justifyContent:'right'}}>
                <button type='button'
                            disabled={isPending}
                            onClick={()=> {mode==='detail' ? changeModeHandler('edit'): submitHandler()}}>
                            {mode==='detail' && <>수&nbsp;&nbsp;&nbsp;&nbsp;정</>}
                            {mode==='edit' && <>수&nbsp;정&nbsp;완&nbsp;료</>}
                            {mode==='write' && <>저&nbsp;&nbsp;&nbsp;&nbsp;장</>}
                    </button>
                    <button type={'button'}
                            onClick={() =>
                                {isMobile ? window.history.back() :
                                (mode==='edit' ?
                                    router.push(`company?mode=detail&target=${company.companyId}`)
                                    : window.close())}}>
                            {mode==='edit' ? <>취&nbsp;&nbsp;&nbsp;&nbsp;소</> : <>창&nbsp;닫&nbsp;기</> }

                    </button>
                </div>
            </form>
        </section>
    )
}