JS Payment APIs
===============

Some experimental stuff trying out how really simple payment APIs could look like - natively provided by a browser

Note: At this point the project is pretty much in research state. There are a lot of areas which we need to dive in
and the main concern right now is to define a set of very usable APIs, and progressivly start worrying about security.

Proposed APIs
-------------

Provider
~~~~~~~~

* payment.supports(obj, callb)

  Checks whether user has stored credentials for a certain payment gateway (e.g. PayPal)

Payment
~~~~~~~

* payment.make(obj, callb)

  Makes payment to payment provider.

* payment.made(obj, callb)

  Checked whether payment to payment provider has been made

* payment.subscribe(obj, callb)

  Makes recurring payment to payment provider

* payment.subscribed(obj, callb)

  Checks whether recurring payment to payment provider has been made

* payment.redeem(obj, callb)

  Redeems payment voucher
