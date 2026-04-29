"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import React, { useState } from 'react'
import { useMutation, useQuery } from "@tanstack/react-query"
import { Toaster, toast } from 'sonner';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import TickIcon from "../svgs/TickIcon"
import axios from 'axios';
import Axios from "../config/Axios"
import { count, error } from "console"
import { SelectLabel } from "@radix-ui/react-select"
import Image from "next/image"



const formSchema = z.object({
  firstName: z
    .string({ required_error: "First name is required." })
    .min(1, { message: "First name is required." })
    .regex(/^[A-Za-z]+$/, { message: "First name should only contain alphabets." }),
  lastName: z
    .string({ required_error: "Last name is required." })
    .min(1, { message: "Last name is required." })
    .regex(/^[A-Za-z\s]+$/, { message: "Last name can contain only alphabets and spaces." }),
  email: z
    .string()
    .email({ message: "Invalid email address." })
    .or(z.literal("").optional()), // Allows valid email or empty string // Optional email
  phone: z
    .string({ required_error: "Phone number is required." })
    .min(7, { message: "Phone number must be at least 7 digits." })
    .regex(/^\d+$/, { message: "Phone number must contain only digits." }),
  countryCode: z.string({ required_error: "Choose code." }),
  message: z
    .string({ required_error: "Message is required." })
    .min(1, { message: "Message is required." }),
});




function ContactForm() {
  const [showToast, setShowToast] = useState(false)
  const [selectedValue, setSelectedValue] = React.useState<string | null>('NPL');

  const [error, setError] = useState('')
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      message: '',
      countryCode: 'NPL'
    }
  })

  const submitFormMutation = useMutation({
    mutationKey: ['contact from'],
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      let countryCode: string = '';
      getCountriesList?.data?.forEach((item: any) => {
        if (item?.country_code_iso_alpha3 === data?.countryCode) {
          countryCode = item?.country_dialing_code
        }
      })
      data = {
        ...data,
        phone: countryCode?.slice(1, countryCode?.length) + data.phone
      }

      console.log(data)
      return await Axios.post('/api/contact/submit-contact', { ...data })
    },
    onSuccess: () => {
      toast.success('Your Form has been recorded successfully.')
      form.reset({ email: '' })
    },
    onError: (e) => {
      toast.error('Error occured! please try again later.')
    }
  })


  const getCountriesList = useQuery({
    queryKey: ['load countries'],
    queryFn: async () => {
      return (await Axios.get('/api/restaurant/countries')).data?.countries
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    submitFormMutation.mutate(values)
  }

  return (
    <Form {...form}>
      <form aria-disabled={submitFormMutation.isPending} onSubmit={form.handleSubmit(onSubmit)} className="relative flex w-full border  p-[12px] md:p-[13px] lg:p-[16px_14px] xl:p-[20px_18px] 2xl:p-[24px_20px] flex-col  gap-2 md:gap-3 lg:gap-4 xl:gap-[24px]  rounded-[12px] bg-white disabled:opacity-15 "

      >
        <Toaster
          position="top-center"
          richColors={true}
        />
        <h3 className="text-gray-800 font-[700] text-base md:text-lg lg:tetx-xl xl:text-[24px] 2xl:text-[28px] 3xl:text-[30px] leading-[150%] font-jakarta"
        >Let’s connect</h3>
        <div className={`gap-2 flex flex-col ${submitFormMutation.isPending ? `pointer-events-none` : ''} `}>
          <div className="flex flex-col lg:flex-row justify-start  gap-2 md:gap-3 lg:gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">First Name <span className="text-[#EF4444]">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">Last Name <span className="text-[#EF4444]">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="someone@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />



          <div className="flex   gap-1 md:gap-2">





            <FormField
              control={form.control}
              name="countryCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" whitespace-nowrap">Phone Number <span className="text-[#EF4444]">*</span></FormLabel>
                  <Select
                    defaultValue="NPL"
                    name="countryCode"
                    onValueChange={(value) => {
                      field.onChange(value); // Update the form field
                      setSelectedValue(value); // Update the local state
                    }}
                  >
                    <SelectTrigger className="w-fit min-w-[80px] !mr-1  md:mr-2 md:min-w-[100px]  h-auto ">
                      {/* Render the custom value */}
                      <div className="flex items-center justify-around  w-full gap-1 md:gap-2">
                        <Image
                          src={getCountriesList?.data?.find(
                            (item: any) => item?.country_code_iso_alpha3 === selectedValue
                          )?.photo_url || null
                          }
                          alt=""
                          height={200}
                          width={200}
                          className="h-[10px] md:h-[18px] max-w-[12px] w-auto  "
                        />
                        {getCountriesList?.data?.find(
                          (item: any) => item?.country_code_iso_alpha3 === selectedValue
                        )?.country_dialing_code || "Country Code"
                        }
                      </div>
                    </SelectTrigger>
                    <SelectContent className="font-jakarta">
                      {getCountriesList?.data?.map((item: any) => (
                        <SelectItem
                          className="whitespace-pre flex items-center"
                          value={item?.country_code_iso_alpha3}
                        >
                          <div className="flex items-center w-full gap-2">              <Image
                            src={item?.photo_url || null
                            }
                            alt=""
                            height={200}
                            width={200}
                            className=" w-[12px]  md:w-[18px] h-auto max-h-[12px]"
                          />
                            {item?.name + "   " + item?.country_dialing_code}
                          </div>

                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />


            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="w-[100%] -ml-2 md:-ml-6">
                  <FormLabel className=''>&nbsp;</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+97********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>



          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">Message <span className="text-[#EF4444]">*</span></FormLabel>
                <FormControl>
                  <Textarea className="mt-[6px] md:mt-3" rows={5} placeholder="Message" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={submitFormMutation.isPending} className={` flex w-full h-[33px] md:h-[35px] lg:h-[40px] xl:h-[50px] 2xl:h-[55px] 3xl:h-[60px] p-[6.654px_11.091px] rounded-[4.43px] bg-orange-500 shadow-[0px_2.218px_3.327px_-0.555px_rgba(0,0,0,0.10),0px_1.109px_2.218px_-1.109px_rgba(0,0,0,0.10)] text-[#FEFEFE] text-center font-[600] text-[10px] md:tetx-[14px] lg:text-[18px] leading-[180%] font-jakarta ${submitFormMutation.isPending ? 'animate-pulse duration-75' : ''}`}
            type="submit">Submit Form</Button>
        </div>
        {(showToast && !error) && <div className="absolute left-1/2 -bottom-11 md:-bottom-6 transform -translate-x-1/2 flex items-center py-2 px-[10px] gap-[6px] bg-emerald-50 font-jakarta text-emerald-700 font-[500] w-[320px] md:w-fit md:min-w-[330px] lg:min-w-[400px] rounded-[8px]">
          <div className="h-4 aspect-square">
            <TickIcon />
          </div>

          <p className="text-xs md:text-[14px] 3xl:text-base font-[500]">Your Form has been recorded successfully.</p>
        </div>}

        {/* {(showToast && error) && <div className="absolute left-1/2 -bottom-11 md:-bottom-6 transform -translate-x-1/2 flex items-center py-2 px-[10px] gap-[6px] bg-emerald-50 font-jakarta text-emerald-700 font-[500] w-[320px] md:w-fit md:min-w-[330px] lg:min-w-[400px] rounded-[8px]">
          <div className="h-4 aspect-square">
            <TickIcon />
          </div>

          <p className="text-xs md:text-[14px] 3xl:text-base font-[500]">Your Form has been recorded successfully.</p>
        </div>} */}
      </form>

    </Form>
  )
}

export default ContactForm
