//
//  ServerOAuthViewController.swift
//  Nxt Ride
//
//  Created by Hemant Banavar on 5/2/15.
//  Copyright (c) 2015 Hemant Banavar. All rights reserved.
//

import UIKit

class ServerOAuthViewController: UIViewController {

    @IBOutlet weak var webView: UIWebView!
    
    override func viewDidLoad() {
        super.viewDidLoad()

        super.viewDidLoad()
        let url = NSURL(string: "https://52.8.0.224/api/me")!
        let request = NSURLRequest(URL: url)
        webView.loadRequest(request)
        
        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
