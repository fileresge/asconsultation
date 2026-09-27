# Business services

The `/business-services` page uses the 42 Pakistan-based entries in
`lib/business-services-data.json`, transcribed from the supplied root `service`
file. The six USA entries are excluded. Updating the source text does not
automatically update the JSON catalog.

Categories and search support shareable URLs:

- `/business-services?category=income-tax`
- `/business-services?category=sales-tax&q=PST`
- `/business-services?category=company-registration`
- `/business-services?category=intellectual-property`
- `/business-services?category=other-registrations`
- `/business-services?service=annual-income-tax-filing`

Each catalog entry has an ID, category, title, optional subtitle, fee text,
fee notes, optional timeline, and requirements. The CCI entry preserves both
fees and timelines from the supplied source; it does not infer a city-to-fee
mapping. Unspecified timelines are shown as available on enquiry.

The shared `components/site-header.tsx` supports desktop hover, click,
Arrow Down to focus the first category, Escape to close, outside-click
dismissal, and a mobile disclosure menu.

Service enquiries use WhatsApp number `923362137034`. The callback dialog
validates the visitor's details and opens a prefilled WhatsApp message. The
visitor must send that message to submit the request; the website does not
store callbacks or claim that a message has already been sent.

Set `NEXT_PUBLIC_WHATSAPP_NUMBER` before building if this number changes.
Do not include the leading plus sign in the environment value.
