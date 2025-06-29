import AccountingSearch from "@/components/main/accounting/search";
import {getAllProcurementApi} from "@/features/accounting/api/search-server-api";
import {getCompany} from "@/features/staff/company/api/server-api";
import {PageByProps} from "@/model/types/share/type";

export default async function PsetPage({searchParams}: PageByProps) {
    const page = (await searchParams).page || 1;

    const companyList = await getCompany()
    const procurementList = await getAllProcurementApi();
    return (
        <AccountingSearch
            companyList={companyList}
            division='pset'
            initialListState={procurementList}
            page={page}/>    
    )
}