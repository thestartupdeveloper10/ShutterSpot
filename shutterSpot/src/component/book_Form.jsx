// "use client"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon, Loader2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectTrigger,
  SelectLabel,
  SelectValue,
} from "@/components/ui/select"
import { publicRequest } from "@/service/requestMethods"

const Formbook = () => {
    const navigate = useNavigate()
    const [date, setDate] = useState(null)
    const [location, setLocation] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleSearch = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            if (!date && !location) {
                throw new Error("Please select a date or enter a location")
            }

            const searchParams = new URLSearchParams()
            if (date) searchParams.append('date', format(date, 'yyyy-MM-dd'))
            if (location) searchParams.append('location', location)

            console.log('Searching with params:', Object.fromEntries(searchParams))
            
            const response = await publicRequest.get(`/photographers/search?${searchParams}`)
            
            if (!response.data) {
                throw new Error("No data received from server")
            }

            navigate('/search-results', { 
                state: { 
                    results: response.data,
                    searchParams: {
                        date: date ? format(date, 'yyyy-MM-dd') : null,
                        location
                    }
                }
            })
        } catch (error) {
            console.error('Search error:', error)
            setError(error.response?.data?.error || error.message || "Failed to search photographers")
        } finally {
            setIsLoading(false)
        }
    }

    const FormSchema = z.object({
        username: z.string().min(2, {
          message: "Username must be at least 2 characters.",
        }),
        dob: z.date({
            required_error: "A date of birth is required.",
          }),
      })

    const form = useForm({resolver: zodResolver(FormSchema),defaultValues: {username: "",},})
    return ( 
        <div className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6">
            <form onSubmit={handleSearch} className="space-y-6">
                <h3 className="text-3xl font-semibold text-center text-gray-800">
                    Find Your Perfect Photographer
                </h3>

                {error && (
                    <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    <div>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-full h-12 justify-start text-left font-normal border-gray-300",
                                        !date && "text-gray-500"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "MMMM d, yyyy") : <span>Select date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                    disabled={(date) => date < new Date()}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <Input
                        type="text"
                        placeholder="Enter location"
                        className="h-12 border-gray-300"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />

                    <Button 
                        type="submit" 
                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white"
                        disabled={isLoading || (!date && !location)}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Searching...
                            </>
                        ) : (
                            'Find Photographers'
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Formbook;