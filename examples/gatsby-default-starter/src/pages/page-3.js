import React from "react"

import ConditionalLayout from "../components/ConditionalLayout"
import SEO from "../components/seo"
import { Link } from 'gatsby-plugin-modal-routing'

const ThirdPage = ({ location, modal = false, modalCloseTo = null }) => (
  <ConditionalLayout location={location} condition={!modal}>
    {modal && (
      <Link to={modalCloseTo}>
        Close
      </Link>
    )}
    <SEO title="Page three" />
    <h1>Hi from the third page {modal && "MODAL!"}</h1>
    <p>Welcome to page 3</p>
    <ul>
      <li><Link to="/page-2/">Go to page 2</Link></li>
      <li><Link to="/page-2/" asModal>Go to page 2 modal</Link></li>
      <li><Link to="/">Go back to the homepage</Link></li>
    </ul>

    <p>Eos ea veniam deleniti possimus tenetur itaque doloremque eveniet. Et voluptatibus velit voluptatem facere. Provident sint similique architecto consequuntur nulla ut rerum nesciunt.</p>

    <p>Nihil sint at sed tempora earum laudantium culpa et. Aperiam hic deleniti delectus fugit occaecati sunt aut dolore. Culpa labore aut non saepe rem sed ea doloribus. Cum ipsum quaerat repudiandae dicta quasi sint dicta aut.</p>

    <p>Quasi exercitationem consequatur magnam. Id inventore ipsam et nobis iure id eligendi. Molestias laborum voluptatem non quis beatae facilis. Ratione ut placeat ipsam ut sed repellendus.</p>

    <p>Sit error rerum est deleniti quos. Libero consequatur qui voluptatem excepturi nulla corporis. Totam occaecati laboriosam voluptate reiciendis id enim cum. Voluptatem aliquam impedit commodi minima sint rerum omnis. Totam ratione culpa soluta tempore dolores quibusdam.</p>

    <p>Est quia omnis delectus fuga inventore. Perferendis aut aperiam magni adipisci. Adipisci alias est natus omnis.</p>
  </ConditionalLayout>
)

export default ThirdPage
