import { Main } from "../../components/Main/index";
import { FAQAddButton } from "../../components/FAQAddButton";
import { useFaqs } from "../../hooks/use-faqs";
import FAQList from "../../components/FAQList/index";

const FAQboard = () => {

  const { faqs, loading, submitting, addFaq, updateFaq, deleteFaq } = useFaqs();

  return (
        <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
          <div className='flex flex-wrap items-end justify-between gap-2'>
            <div>
              <h2 className='text-2xl font-bold tracking-tight'>Frequently Asked Questions</h2>
              <p className='text-muted-foreground'>
                Manage FAQs and their answers here.
              </p>
            </div>
            <FAQAddButton onSubmit={(q, a) => addFaq(q, a)} submitting={submitting}/>
          </div>
          {loading ? (
            <p>Loading FAQs...</p>
          ) : (
            <FAQList faqs={faqs} onEdit={updateFaq} onDelete={deleteFaq} />
          )}
      </Main>
  )

  };

  export default FAQboard;